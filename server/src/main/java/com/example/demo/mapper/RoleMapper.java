package com.example.demo.mapper;

import com.example.demo.dto.RoleDto;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;

import java.util.stream.Collectors;

public class RoleMapper {
    public static RoleDto mapToRoleDto(Role role) {
        return new RoleDto(
                role.getRoleId(),
                role.getName(),
                role.getDescription(),
                role.getUsers().stream().map(User::getUserId).collect(Collectors.toList()) // Convert users to a list of IDs
        );
    }

    public static Role mapToRole(RoleDto roleDto) {
        Role role = new Role();
        role.setRoleId(roleDto.getRoleId());
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        return role; // Note: We are not setting users here since we only have user IDs in RoleDto
    }
}
