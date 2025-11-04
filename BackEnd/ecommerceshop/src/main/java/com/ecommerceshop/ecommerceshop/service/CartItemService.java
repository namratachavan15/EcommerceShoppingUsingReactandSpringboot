package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.CartItemException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.Product;

public interface CartItemService {

    public CartItem createCartItem(CartItem item);
    public CartItem updateCartItem(Long userId,Long id,CartItem cartItem)throws CartItemException, UserException;
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userid);
    public void removeCartItem(Long userId,Long cartItemId)throws CartItemException, UserException;
    public CartItem findCartItemById(Long cartItemId)throws CartItemException;

}
