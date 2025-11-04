package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);
    public String addCartItem(Long userId, AddItemRequest req)throws ProductException;
    public Cart findUserCart(Long userId);

    public void clearCart(Long userId);

}
