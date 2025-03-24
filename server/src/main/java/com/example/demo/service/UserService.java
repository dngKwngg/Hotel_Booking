package com.example.demo.service;

import com.example.demo.dto.UserDto;

import java.util.List;

//Để định nghĩa các action ý
//Xong sẽ triển khai nó ở 1 file riêng
public interface UserService {
    UserDto getUserById(Long id);
    UserDto createUser(UserDto userDto);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    List<UserDto> getAllUsers();
}
