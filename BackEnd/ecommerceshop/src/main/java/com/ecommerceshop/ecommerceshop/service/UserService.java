package com.ecommerceshop.ecommerceshop.service;

import com.ecommerceshop.ecommerceshop.exception.UserException;
import com.ecommerceshop.ecommerceshop.model.Address;
import com.ecommerceshop.ecommerceshop.model.User;

public interface UserService {

    public User findUserById(Long userId)throws UserException;

    public User findUserProfileByJwt(String jwt)throws UserException;
    public Address addAddress(String jwt, Address address)throws UserException;
}
