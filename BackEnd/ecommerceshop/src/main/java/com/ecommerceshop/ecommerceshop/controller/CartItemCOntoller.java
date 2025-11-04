package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.CartItemException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.response.ApiResponse;
import com.ecommerceshop.ecommerceshop.service.CartItemService;
import com.ecommerceshop.ecommerceshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CartItemCOntoller {

    @Autowired
    CartItemService cartItemService;

    @Autowired
    UserService userService;

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId,@RequestHeader("Authorization") String jwt)throws UserException, CartItemException {
        User user=userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(),cartItemId);

        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Successfully deleted");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @RequestBody CartItem cartItem,
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt
    )throws UserException, CartItemException
    {
        User user=userService.findUserProfileByJwt(jwt);
        System.out.println("CartItem in update cart:"+cartItem.getQuantity());
        CartItem updatedCartItem=cartItemService.updateCartItem(user.getId(),cartItemId,cartItem);
        return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }
}
