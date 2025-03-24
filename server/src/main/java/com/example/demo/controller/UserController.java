package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.dto.request.UserRegisterDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // cho phép controller gọi đến api
@RequestMapping("${api.version}/users") // dẫn đến api localhost:8080/api/v1/users
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping //GET /api/v1/users

    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}") //GET /api/v1/users/{id}
    // getUserById  GET /api/v1/users/100
    // @PathVariable tự đọc đc id là 100
    public UserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

//    @PostMapping // POST /api/v1/users ( phải post cái gì đó lên)
//    @ResponseStatus(HttpStatus.CREATED) // trả về status 201
//    // @RequestBody -> đọc cái gì đó từ body của request
//    public UserDto createUser(@RequestBody UserDto userDto) {
//        return userService.createUser(userDto);
//    }

    @PutMapping("/{id}") // PUT /api/v1/users/{id} sửa thông tin user có id = id
    //PUT /api/v1/users/100
    public UserDto updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return userService.updateUser(id, userDto);
    }

    @DeleteMapping("/{id}") // DELETE /api/v1/users/{id} xóa user có id = id
    // ResponseEntity<?> hỗ trợ trả về các kiểu có thể có của response
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }
}
