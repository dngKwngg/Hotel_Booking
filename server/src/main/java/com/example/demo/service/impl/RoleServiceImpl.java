package com.example.demo.service.impl;

import com.example.demo.dto.RoleDto;
import com.example.demo.enitties.Role;
import com.example.demo.service.RoleService;
import com.example.demo.mapper.RoleMapper;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    // Inject
    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<RoleDto> getAllRoles() {
        List<Role> roles = roleRepository.findAll();

        return roles.stream().map(RoleMapper::toRoleDto).collect(Collectors.toList());
    }
}
