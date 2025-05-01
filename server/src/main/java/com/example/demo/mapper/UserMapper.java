package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;

public class UserMapper {
    // user -> userDto
    public static UserDto mapToUserDto(User user) {
        return new UserDto(
            user.getUserId(),
            user.getEmail(),
            user.getUsername(),
            user.getPhoneNumber(),
            user.getFirstName(),
            user.getLastName(),
            user.getDateOfBirth(),
            user.getNationality(),
            user.getRole()
        );
    }

    //userDto -> user
    public static User mapToUser(UserDto userDto) {
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setNationality(userDto.getNationality());
        user.setRole(userDto.getRole());
//        user.setRole(role);

        return user;
    }
}
