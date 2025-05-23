package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.dto.request.UserRegisterDto;

import java.util.List;

//Để định nghĩa các action ý
//Xong sẽ triển khai nó ở 1 file riêng
public interface UserService {
    UserDto getUserById(Long id);
    UserDto createUser(UserRegisterDto userDto);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    List<UserDto> getAllUsers();
    // Change password function
    void changePassword(Long id, String oldPassword, String newPassword);
}
