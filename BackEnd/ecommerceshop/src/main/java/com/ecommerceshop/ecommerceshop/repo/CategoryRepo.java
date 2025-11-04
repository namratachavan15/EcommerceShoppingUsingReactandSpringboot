package com.ecommerceshop.ecommerceshop.repo;

import com.ecommerceshop.ecommerceshop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {

public Category findByName(String name);

@Query("select c from Category c where c.name=:name And c.parentCategory.name=:parentCategoryName")
public Category findByNameAndParent(@Param("name") String name,@Param("parentCategoryName") String parentCategoryName);
}
