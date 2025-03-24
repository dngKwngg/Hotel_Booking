package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDto {
    private Long userId;
    private String email;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Long roleId;
}
