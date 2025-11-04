package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.model.Review;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.ProductRepo;
import com.ecommerceshop.ecommerceshop.repo.ReviewRepo;
import com.ecommerceshop.ecommerceshop.request.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
   ReviewRepo reviewRepo;
    @Autowired
    ProductService productService;

    @Autowired
    ProductRepo productRepo;

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {

        Product product = productService.findProductById(req.getProductId());
        Review review = new Review();
        review.setUser(user);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());
        review.setProduct(
                product
        );

      return   reviewRepo.save(review);
    }

    @Override
    public List<Review> getAllReview(Long productId) {
        return reviewRepo.getAllProductsReview(productId);
    }
}
