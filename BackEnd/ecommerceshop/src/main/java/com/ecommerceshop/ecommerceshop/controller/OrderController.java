package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.OrderException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Address;
import com.ecommerceshop.ecommerceshop.model.Order;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.service.OrderService;
import com.ecommerceshop.ecommerceshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,
                                             @RequestHeader("Authorization") String jwt) throws OrderException, UserException {
        System.out.println("inside create order");
        User user=userService.findUserProfileByJwt(jwt);
        Order order=orderService.createOrder(user,shippingAddress);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> userOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        System.out.println("User: " + user);

        List<Order> orders = orderService.usersOrderHistory(user.getId());

        // Print list of orders
        if (orders.isEmpty()) {
            System.out.println("No orders found for this user.");
        } else {
            System.out.println("Orders for user " + user.getFirstName() + ":");
            for (Order order : orders) {
                System.out.println("Order ID: " + order.getId() +
                        ", Status: " + order.getOrderStatus() +
                        ", Total: " + order.getTotalPrice() +
                        ", Date: " + order.getOrderDate());
            }
        }

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


    @GetMapping("/{Id}")
    public ResponseEntity<Order> findOrderById(@PathVariable Long Id,@RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        User user=userService.findUserProfileByJwt(jwt);

        Order order=orderService.findOrderById(Id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
