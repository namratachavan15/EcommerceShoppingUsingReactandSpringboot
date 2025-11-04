package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.OrderException;
import com.ecommerceshop.ecommerceshop.model.*;
import com.ecommerceshop.ecommerceshop.repo.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartService cartItemService;
    @Autowired
    private ProductService productService;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private CartService cartService;

    @Override
    public Order createOrder(User user, Address shippingAddress) {

        // ✅ 1. Attach address to user
        shippingAddress.setUser(user);
        Address address = addressRepo.save(shippingAddress);
        user.getAddresses().add(address);
        userRepo.save(user);

        // ✅ 2. Get user's cart
        Cart cart = cartService.findUserCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        // ✅ 3. Create OrderItems from CartItems
        for (CartItem item : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            orderItem.setUserId(item.getUserId());
            orderItem.setDiscountedPrice(item.getDiscountedPrice());

            // Optionally set delivery date for each item (same as order delivery date)
            orderItem.setDeliveryDate(LocalDateTime.now().plusDays(5)); // Example: 5 days from now

            OrderItem createdOrderItem = orderItemRepo.save(orderItem);
            orderItems.add(createdOrderItem);
        }

        // ✅ 4. Create and populate the Order object
        Order createdOrder = new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
        createdOrder.setDiscount(cart.getDiscount());
        createdOrder.setTotalItem(cart.getTotalItem());
        createdOrder.setShippingAddress(shippingAddress);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.getPaymentDetails().setStatus("PENDING");
        createdOrder.setCreatedAt(LocalDateTime.now());

        // ✅ Set amount and delivery date here
        createdOrder.setAmount(cart.getAmount());
        createdOrder.setDeliveryDate(LocalDateTime.now().plusDays(5)); // Example: 5 days later

        // ✅ 5. Save order (to get generated ID)
        Order savedOrder = orderRepo.save(createdOrder);

        // ✅ 6. Generate and save custom Order ID
        String generatedOrderId = "ORD-" + LocalDateTime.now().getYear() + "-" + savedOrder.getId();
        savedOrder.setOrderId(generatedOrderId);
        orderRepo.save(savedOrder);

        // ✅ 7. Link back order reference in each order item
        for (OrderItem item : orderItems) {
            item.setOrder(savedOrder);
            orderItemRepo.save(item);
        }

        // ✅ 8. Clear the user's cart after order creation
        cartService.clearCart(user.getId());

        return savedOrder;
    }


//    @Override
//    public Order createOrder(User user, Address shippingAddress) {
//
//        shippingAddress.setUser(user);
//        Address address = addressRepo.save(shippingAddress);
//        user.getAddresses().add(address);
//        userRepo.save(user);
//
//        Cart cart = cartService.findUserCart(user.getId());
//        List<OrderItem> orderItems = new ArrayList<>();
//
//        for (CartItem item : cart.getCartItems()) {
//            OrderItem orderItem = new OrderItem();
//            orderItem.setPrice(item.getPrice());
//            orderItem.setProduct(item.getProduct());
//            orderItem.setQuantity(item.getQuantity());
//            orderItem.setSize(item.getSize());
//            orderItem.setUserId(item.getUserId());
//            orderItem.setDiscountedPrice(item.getDiscountedPrice());
//            OrderItem createOrderItem = orderItemRepo.save(orderItem);
//            orderItems.add(createOrderItem);
//        }
//
//        Order createdOrder = new Order();
//        createdOrder.setUser(user);
//        createdOrder.setOrderItems(orderItems);
//        createdOrder.setTotalPrice(cart.getTotalPrice());
//        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
//        createdOrder.setDiscount(cart.getDiscount());
//        createdOrder.setTotalItem(cart.getTotalItem());
//        createdOrder.setShippingAddress(shippingAddress);
//        createdOrder.setOrderDate(LocalDateTime.now());
//        createdOrder.setOrderStatus("PENDING");
//        createdOrder.getPaymentDetails().setStatus("PENDING");
//        createdOrder.setCreatedAt(LocalDateTime.now());
//        createdOrder.setAmount(cart.getAmount());
//
//
//        // ✅ First save the order (so that ID is generated)
//        Order savedOrder = orderRepo.save(createdOrder);
//
//        // ✅ Generate custom orderId after ID is known
//        String generatedOrderId = "ORD-" + LocalDateTime.now().getYear() + "-" + savedOrder.getId();
//        savedOrder.setOrderId(generatedOrderId);
//        orderRepo.save(savedOrder);
//
//        // Attach order reference to orderItems
//        for (OrderItem item : orderItems) {
//            item.setOrder(savedOrder);
//            orderItemRepo.save(item);
//        }
//
//        // ✅ Clear the cart after order is placed
//        cartService.clearCart(user.getId());
//
//        return savedOrder;
//    }

//    public Order createOrder(User user, Address shippingAddress) {
//
//        shippingAddress.setUser(user);
//        Address address = addressRepo.save(shippingAddress);
//        user.getAddresses().add(address);
//        userRepo.save(user);
//
//        Cart cart=cartService.findUserCart(user.getId());
//        List<OrderItem> orderItems=new ArrayList<>();
//
//        for(CartItem item:cart.getCartItems())
//        {
//            OrderItem orderItem=new OrderItem();
//
//            orderItem.setPrice(item.getPrice());
//            orderItem.setProduct(item.getProduct());
//            orderItem.setQuantity(item.getQuantity());
//            orderItem.setSize(item.getSize());
//            orderItem.setUserId(item.getUserId());
//            orderItem.setDiscountedPrice(item.getDiscountedPrice());
//            OrderItem createOrderItem=orderItemRepo.save(orderItem);
//            orderItems.add(createOrderItem);
//
//        }
//        Order createdOrder=new Order();
//        createdOrder.setUser(user);
//        createdOrder.setOrderItems(orderItems);
//        createdOrder.setTotalPrice(cart.getTotalPrice());
//        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
//        createdOrder.setDiscount(cart.getDiscount());
//        createdOrder.setTotalItem(cart.getTotalItem());
//        createdOrder.setShippingAddress(shippingAddress);
//        createdOrder.setTotalItem(cart.getTotalItem());
//        createdOrder.setOrderDate(LocalDateTime.now());
//        createdOrder.setOrderStatus("PENDING");
//        createdOrder.getPaymentDetails().setStatus("PENDING");
//        createdOrder.setCreatedAt(LocalDateTime.now());
//        createdOrder.setAmount(cart.getAmount());
//       Order savedOrder= orderRepo.save(createdOrder);
//       for(OrderItem item:orderItems)
//       {
//           item.setOrder(savedOrder);
//           orderItemRepo.save(item);
//       }
//        return savedOrder;
//    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
           Optional<Order> opt= orderRepo.findById(orderId);

           if(opt.isPresent())
           {
               return opt.get();
           }
           throw new OrderException("Order not found"+orderId);
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepo.getUsersOrder(userId);
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {

            Order order= findOrderById(orderId);
            order.setOrderStatus("PLACED");
            order.getPaymentDetails().setStatus("COMPLETED");
        return order;
    }

    @Override
    @Transactional
    public Order confirmedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("CONFIRMED");
        return orderRepo.save(order);
    }

    @Override
    @Transactional
    public Order shippedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("SHIPPED");
        return orderRepo.save(order);
    }

    @Override
    @Transactional
    public Order deliveredOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("DELIVERED");
        return orderRepo.save(order);
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        orderRepo.delete(order);
    }

    @Override
    public Order cancledOrder(Long orderId) throws OrderException {
        Order order= findOrderById(orderId);
        order.setOrderStatus("CANCELED");
        return orderRepo.save(order);
    }

    @Override
    public List<Order> getAllOrders() {

        return orderRepo.findAll();

    }


}
