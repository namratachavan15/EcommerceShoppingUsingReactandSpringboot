package com.ecommerceshop.ecommerceshop.repo;

import com.ecommerceshop.ecommerceshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    public User findByEmail(String email);
}
