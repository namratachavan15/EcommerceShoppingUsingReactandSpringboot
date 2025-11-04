package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.model.OrderItem;
import com.ecommerceshop.ecommerceshop.repo.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService
{
    @Autowired
    private OrderItemRepo orderItemRepo;

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepo.save(orderItem);
    }

}
