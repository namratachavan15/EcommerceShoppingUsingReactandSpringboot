package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.model.Rating;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.RatingRepo;
import com.ecommerceshop.ecommerceshop.request.RatingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImplementation  implements RatingService {

    @Autowired
    private RatingRepo ratingRepo;
    @Autowired
    private ProductService productService;


    @Override
    public Rating createRating(RatingRequest re, User user) throws ProductException {
        Product product=productService.findProductById(re.getProductId());

        Rating rating=new Rating();
        rating.setProduct(product);
        rating.setRating(re.getRating());
        rating.setUser(user);
        rating.setCreatedAt(LocalDateTime.now());

        return ratingRepo.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {
        return ratingRepo.getAllProductsRating(productId);
    }
}
