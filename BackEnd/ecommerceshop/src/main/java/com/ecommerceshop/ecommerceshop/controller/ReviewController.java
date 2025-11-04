package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Review;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.request.ReviewRequest;
import com.ecommerceshop.ecommerceshop.service.ReviewService;
import com.ecommerceshop.ecommerceshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;


    @PostMapping("/create")
    public ResponseEntity<?> createReview(
            @RequestBody ReviewRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProductException {
        System.out.println("inside create review");
       // String token = jwt.substring(7); // remove "Bearer "
//        User user = userService.findUserProfileByJwt(jwt);
//        Review review = reviewService.createReview(req, user);
//        return new ResponseEntity<>(review, HttpStatus.CREATED);

        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(req, user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Review created successfully");
        response.put("reviewId", review.getId());
        response.put("reviewText", review.getReview());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReview(@PathVariable Long productId) throws UserException {
        System.out.println("inside review");
        List<Review> reviews=reviewService.getAllReview(productId);
        for (Review review : reviews) {
            System.out.println("⭐ Review ID: " + review.getId()

                    + " | Comment: " + review.getReview()
                    + " | User: " + (review.getUser() != null ? review.getUser().getFirstName() : "Unknown"));
        }
        return new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);
    }
}
