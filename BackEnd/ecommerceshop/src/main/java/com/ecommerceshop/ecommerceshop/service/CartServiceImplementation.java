package com.ecommerceshop.ecommerceshop.service;


import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.model.User;
import com.ecommerceshop.ecommerceshop.repo.CartRepository;
import com.ecommerceshop.ecommerceshop.request.AddItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private  ProductService productService;

    @Autowired
    private  UserService userService;

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public void clearCart(Long userId) {
        Cart cart = findUserCart(userId);
        if (cart != null) {
            cart.getCartItems().clear();
            cart.setTotalItem(0);
            cart.setTotalPrice(0);
            cart.setDiscount(0);
            cart.setTotalDiscountedPrice(0);
            cart.setAmount(0);
            cartRepository.save(cart);
        }
    }
    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);

        // If no cart exists, create one
        if (cart == null) {
            cart = new Cart();
            User user = null; // 👈 get User object
            try {
                user = userService.findUserById(userId);
            } catch (UserException e) {
                throw new RuntimeException(e);
            }
            cart.setUser(user);
            cart = cartRepository.save(cart); // save to DB
        }

        Product product = productService.findProductById(req.getProductId());

        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserId(userId);
            cartItem.setSize(req.getSize());

            int price = req.getQuantity() * product.getPrice();
            cartItem.setPrice(price);

            CartItem createdCartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        }

        return "Item Add To Cart";
    }



    @Override
    public Cart findUserCart(Long userId) {
        System.out.println("user id in user cart"+userId);
        Cart cart=cartRepository.findByUserId(userId);
        int totalPrice=0;
        int totalDiscountedPrice=0;
        int totalItem=0;
        int amount=0;
        int discount=0;

        for(CartItem cartItem:cart.getCartItems()){
            totalPrice=totalPrice+cartItem.getPrice();
            totalDiscountedPrice+=cartItem.getDiscountedPrice();
            discount+=cartItem.getProduct().getDiscountPercent();
            totalItem+=cartItem.getQuantity();
        }
         amount=totalPrice-discount;
        cart.setAmount(amount);

        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        cart.setDiscount(discount);
        System.out.println("total price"+totalPrice);
        System.out.println("total discounted price"+totalDiscountedPrice);
        System.out.println("amount"+amount);
        return cartRepository.save(cart);
    }
}
