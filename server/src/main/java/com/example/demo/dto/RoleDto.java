package com.example.demo.dto;

import com.example.demo.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    private Long roleId;
    private String name;
    private String description;
    private List<Long> userIds; // Store only user IDs
}
