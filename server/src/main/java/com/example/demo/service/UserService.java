package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.dto.request.UserRegisterDto;

import java.util.List;

public interface UserService {
    UserDto getUserById(Long id);
    UserDto createUser(UserRegisterDto userDto);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    List<UserDto> getAllUsers();
}
