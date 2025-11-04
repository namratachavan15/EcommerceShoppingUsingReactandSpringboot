package com.ecommerceshop.ecommerceshop.controller;


import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.UserRepo;
import com.ecommerceshop.ecommerceshop.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class AdminUserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private OrderRepo orderRepo;

    // Get all users with their orders & payments
    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsersWithOrders() {
        System.out.println("inside getallusers");
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }

    // Get single user details with orders
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
}
