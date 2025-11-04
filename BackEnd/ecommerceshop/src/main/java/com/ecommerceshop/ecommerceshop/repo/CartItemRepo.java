package com.ecommerceshop.ecommerceshop.repo;

import com.ecommerceshop.ecommerceshop.model.Cart;
import com.ecommerceshop.ecommerceshop.model.CartItem;
import com.ecommerceshop.ecommerceshop.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

    @Query("SELECT ci from CartItem ci where ci.cart=:cart And ci.product=:product And ci.size=:size And ci.userId=:userId")
    public CartItem isCartItemExist(@Param("cart") Cart cart, @Param("product") Product product, @Param("size") String size, @Param("userId") Long userId);

    @Transactional
    void deleteByProduct(Product product);

}
