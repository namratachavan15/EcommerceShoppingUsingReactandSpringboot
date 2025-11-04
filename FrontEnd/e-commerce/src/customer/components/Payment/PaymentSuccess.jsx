import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../state/Order/Action";
import { updatePayment } from "../../../state/Payment/Action";
import { Alert, AlertTitle, Container, Grid } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCart from "../AddressCart/AddressCart";
import ProductReviewSection from "../ProductDetails/ProductReviewSection";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    // ✅ Get Razorpay callback params
    const urlParam = new URLSearchParams(window.location.search);

    // Razorpay sends these params after redirect
    const razorpayPaymentId = urlParam.get("razorpay_payment_id");
    const razorpayPaymentLinkId = urlParam.get("razorpay_payment_link_id");
    const razorpayStatus = urlParam.get("razorpay_payment_link_status");

    setPaymentId(razorpayPaymentId);
    setPaymentStatus(razorpayStatus);

    if (razorpayPaymentId && orderId) {
      const data = { orderId, paymentId: razorpayPaymentId };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        {paymentStatus === "paid" ? (
          <Alert
            variant="filled"
            severity="success"
            sx={{ mb: 6, width: "fit-content" }}
          >
            <AlertTitle>Payment Success</AlertTitle>
            Congratulations 🎉 Your order has been placed!
          </Alert>
        ) : (
          <Alert
            variant="filled"
            severity="error"
            sx={{ mb: 6, width: "fit-content" }}
          >
            <AlertTitle>Payment Failed</AlertTitle>
            Oops! Something went wrong with your payment.
          </Alert>
        )}
      </div>

      <OrderTracker activeStep={1} />

      {order.order?.orderItems?.map((item) => (
  <Grid
    key={item.id}
    container
    className="space-y-5 py-5 pt-20"
    style={{ marginLeft: "50px" }}
  >
    <Grid
      container
      item
      className="shadow-xl rounded-md p-5"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Grid item xs={6}>
        <div className="flex items-center">
          <img
            className="w-[5rem] h-[5rem] object-cover object-top"
            src={item.product.imageUrl}
            alt=""
          />
          <div className="ml-5 space-y-2">
            <p>{item.product.title}</p>
            <div className="opacity-50 text-xs font-semibold space-x-5">
              <span>Color: {item.color}</span>
              <span>Size: {item.size}</span>
            </div>
            <p>Seller: {item.product.brand}</p>
            <p>₹ {item.price}</p>
          </div>
        </div>
      </Grid>
      <Grid item style={{ marginLeft: "380px" }}>
        <AddressCart address={order.order?.shippingAddress} />
      </Grid>

      {/* REVIEW SECTION */}
      <Grid item xs={12} mt={2}>
      <ProductReviewSection
  productId={item.product.id}
  userId={order.order?.user?.id}
/>

      </Grid>
    </Grid>
  </Grid>
))}
{/* REVIEW SECTION */}
    
    </div>

  );
};

export default PaymentSuccess;
