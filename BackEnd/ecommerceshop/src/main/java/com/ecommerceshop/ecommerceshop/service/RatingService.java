package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.Rating;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.request.RatingRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RatingService {

    public Rating createRating(RatingRequest re, User user)throws ProductException;
    public List<Rating> getProductsRating(Long productId);

}
