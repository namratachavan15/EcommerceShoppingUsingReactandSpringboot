package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.request.AddItemRequest;
import com.ecommerceshop.ecommerceshop.response.ApiResponse;
import com.ecommerceshop.ecommerceshop.service.CartService;
import com.ecommerceshop.ecommerceshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")

public class CartContoller {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt)throws UserException{

        User user=userService.findUserProfileByJwt(jwt);
        Cart cart=cartService.findUserCart(user.getId());
        System.out.println("cart in find user cart"+cart.getCartItems());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user=userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(),req);
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Successfully added item");
        apiResponse.setStatus(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }
}
