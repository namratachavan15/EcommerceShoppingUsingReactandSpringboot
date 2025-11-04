package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.CartItemException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.CartItemRepo;
import com.ecommerceshop.ecommerceshop.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService{

    @Autowired
   private CartItemRepo cartItemRepo;
    @Autowired
   private UserService userService;
    @Autowired
   private CartRepository cartRepo;


    @Override
    public CartItem createCartItem(CartItem item) {
       item.setQuantity(1);
       item.setPrice(item.getProduct().getPrice()*item.getQuantity());
        System.out.println("get discounted price"+item.getProduct().getDiscountedPrice());
       item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());

       CartItem createdCartItem = cartItemRepo.save(item);
       return createdCartItem;
    }

    @Override

    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
        CartItem item = findCartItemById(id); // DB object
        User user = userService.findUserById(item.getUserId());

        if (user.getId().equals(userId)) {
            int newQuantity = cartItem.getQuantity(); // ✅ this is the updated quantity sent from client
            System.out.println("Incoming quantity from client: " + newQuantity);

            item.setQuantity(newQuantity); // ✅ update DB object
            item.setPrice(newQuantity * item.getProduct().getPrice());
            item.setDiscountedPrice(newQuantity * item.getProduct().getDiscountedPrice());
        } else {
            throw new UserException("You can't update another user's item.");
        }

        return cartItemRepo.save(item);
    }


    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userid) {

        CartItem cartItem=cartItemRepo.isCartItemExist(cart, product, size, userid);
        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem=findCartItemById(cartItemId);
        System.out.println("cart item id:"+cartItemId);
        System.out.println("cart item"+cartItem);
        User user=userService.findUserById(cartItem.getUserId());

        User reqUser=userService.findUserById(userId);

        if(user.getId().equals(reqUser.getId())){
            cartItemRepo.deleteById(cartItemId);
        }
        else {
            throw new UserException("You cant remove another user item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {

        System.out.println("cart item id:"+cartItemId);
        Optional<CartItem> opt = cartItemRepo.findById(cartItemId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new CartItemException("CartItem not found");
    }
}
