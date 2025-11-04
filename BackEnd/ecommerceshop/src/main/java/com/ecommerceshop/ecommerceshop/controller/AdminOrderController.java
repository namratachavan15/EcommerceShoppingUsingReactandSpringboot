package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.OrderException;
import com.ecommerceshop.ecommerceshop.model.Order;
import com.ecommerceshop.ecommerceshop.response.ApiResponse;
import com.ecommerceshop.ecommerceshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("")
    public ResponseEntity<List<Order>>  getAllOrdersHandler()
    {
        System.out.println("inside");
        List<Order> orders=orderService.getAllOrders();
        return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/confirmed")
    public ResponseEntity<Order> confirmOrder(@PathVariable Long orderId,
                                              @RequestHeader("Authorization") String jwt) throws OrderException {
        Order confirmedOrder = orderService.confirmedOrder(orderId);
        return new ResponseEntity<>(confirmedOrder, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/ship")
    public ResponseEntity<Order> shipOrder(@PathVariable Long orderId,
                                           @RequestHeader("Authorization") String jwt) throws OrderException {
        Order shippedOrder = orderService.shippedOrder(orderId);
        return new ResponseEntity<>(shippedOrder, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<Order> deliverOrder(@PathVariable Long orderId,
                                              @RequestHeader("Authorization") String jwt) throws OrderException {
        Order deliveredOrder = orderService.deliveredOrder(orderId);
        return new ResponseEntity<>(deliveredOrder, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/cancel")
    public  ResponseEntity<Order> CancelOrderHandler(@PathVariable Long orderId,
                                                     @RequestHeader("Authorization") String jwt)throws OrderException
    {
        Order cancledOrder = orderService.cancledOrder(orderId);
        return new ResponseEntity<>(cancledOrder, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}/delete")
    public  ResponseEntity<ApiResponse> DeleteOrderHandler(@PathVariable Long orderId,
                                                           @RequestHeader("Authorization") String jwt)throws OrderException
    {


         orderService.deleteOrder(orderId);
         ApiResponse res=new ApiResponse();
         res.setMessage("Order deleted successfully");
         res.setStatus(true);
         return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
