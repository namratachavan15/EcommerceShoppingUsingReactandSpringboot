package com.ecommerceshop.ecommerceshop.repo;

import com.ecommerceshop.ecommerceshop.model.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
//    @Modifying
//    @Transactional
//    @Query("DELETE FROM OrderItem o WHERE o.product.id = :productId")
//    void deleteByProductId(@Param("productId") Long productId);

}
