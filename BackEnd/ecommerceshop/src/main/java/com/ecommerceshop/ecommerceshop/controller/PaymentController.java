package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.OrderException;
import com.ecommerceshop.ecommerceshop.model.Order;
import com.ecommerceshop.ecommerceshop.model.PaymentDetails;
import com.ecommerceshop.ecommerceshop.repo.OrderRepo;
import com.ecommerceshop.ecommerceshop.response.ApiResponse;
import com.ecommerceshop.ecommerceshop.response.PaymentLinkResponse;
import com.ecommerceshop.ecommerceshop.service.OrderService;
import com.ecommerceshop.ecommerceshop.service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepo orderRepo;

    // ----------------- CREATE PAYMENT LINK -----------------
    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt) throws OrderException, RazorpayException {

        Order order = orderService.findOrderById(orderId);

        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", order.getTotalPrice() * 100); // Razorpay accepts paise
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstName());
            customer.put("email", order.getUser().getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "http://localhost:3000/payment/" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            System.out.println("Payment Link ID: " + paymentLinkId);
            System.out.println("Payment Link URL: " + paymentLinkUrl);

            PaymentLinkResponse response = new PaymentLinkResponse();
            response.setPayment_link_id(paymentLinkId);
            response.setPayment_link_url(paymentLinkUrl);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            throw new RazorpayException("Error creating payment link: " + e.getMessage());
        }
    }

    // ----------------- REDIRECT / VERIFY PAYMENT -----------------
    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> redirect(
            @RequestParam(name = "payment_id", required = false) String paymentId,
            @RequestParam(name = "order_id") Long orderId
    ) throws RazorpayException, OrderException {

        ApiResponse res = new ApiResponse();

        if (paymentId == null || paymentId.equals("undefined")) {
            res.setMessage("Payment not completed yet");
            res.setStatus(false);
            return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
        }

        Order order = orderService.findOrderById(orderId);
        RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

        // ✅ Fetch payment
        Payment payment = razorpay.payments.fetch(paymentId);

        // ✅ Get raw JSONObject from Payment
        JSONObject paymentJson = payment.toJson();

        System.out.println("Payment JSON: " + paymentJson.toString(2));

        if ("captured".equals(paymentJson.optString("status"))) {

            PaymentDetails paymentDetails = order.getPaymentDetails();
            if (paymentDetails == null) paymentDetails = new PaymentDetails();

            paymentDetails.setPaymentId(paymentId);
            paymentDetails.setStatus("COMPLETED");
            paymentDetails.setPaymentMethod(paymentJson.optString("method"));
            paymentDetails.setRazorpayPaymentId(paymentJson.optString("id"));
            paymentDetails.setRazorpayPaymentLinkId(paymentJson.optString("payment_link_id"));

            // ✅ Handle notes safely (JSONObject or JSONArray)
            Object notesObj = paymentJson.opt("notes");
            String referenceId = null;

            if (notesObj instanceof JSONObject jsonObj) {
                referenceId = jsonObj.optString("reference_id", null);
            } else if (notesObj instanceof JSONArray jsonArray && jsonArray.length() > 0) {
                referenceId = jsonArray.optString(0, null);
            }

            paymentDetails.setRazorpayPaymentLinkRefernceId(referenceId);

            // ✅ Save payment details
            order.setPaymentDetails(paymentDetails);
            order.setOrderStatus("PLACED");
            orderRepo.save(order);

            res.setMessage("✅ Your order has been placed successfully!");
            res.setStatus(true);
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }

        res.setMessage("Payment failed or not captured");
        res.setStatus(false);
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

}
