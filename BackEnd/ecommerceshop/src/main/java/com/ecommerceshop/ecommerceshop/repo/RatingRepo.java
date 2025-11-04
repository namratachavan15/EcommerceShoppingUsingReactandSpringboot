package com.ecommerceshop.ecommerceshop.repo;

import com.ecommerceshop.ecommerceshop.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepo extends JpaRepository<Rating,Long> {

    @Query("SELECT r from Rating r where r.product.id=:productId")
    public List<Rating> getAllProductsRating(@Param("productId")Long productId);
}
