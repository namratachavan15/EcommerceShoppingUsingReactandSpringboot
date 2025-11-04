package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.OrderException;
import com.ecommerceshop.ecommerceshop.model.Address;
import com.ecommerceshop.ecommerceshop.model.Order;
import com.ecommerceshop.ecommerceshop.model.User;

import java.util.List;

public interface OrderService {

      public Order createOrder(User user, Address shippingAddress);
     // public void clearCart(Long userId);

      public  Order findOrderById(Long orderId)throws OrderException;

      public List<Order> usersOrderHistory(Long userId);

      public Order placedOrder(Long orderId)throws OrderException;

      public Order confirmedOrder(Long orderId)throws OrderException;

      public Order shippedOrder(Long orderId)throws OrderException;

      public Order deliveredOrder(Long orderId)throws OrderException;
      public Order cancledOrder(Long orderId)throws OrderException;
      public List<Order> getAllOrders();
      public void deleteOrder(Long orderId)throws OrderException;
}
