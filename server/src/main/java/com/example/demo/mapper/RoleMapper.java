package com.example.demo.mapper;

import com.example.demo.dto.RoleDto;
import com.example.demo.enitties.Role;

public class RoleMapper {
    public static RoleDto toRoleDto(Role role) {
        return new RoleDto(role.getId(), role.getRoleName(), role.getDescription());
    }

    public static Role toRole(RoleDto roleDto) {
        return new Role(roleDto.getId(), roleDto.getRoleName(), roleDto.getDescription());
    }
}
