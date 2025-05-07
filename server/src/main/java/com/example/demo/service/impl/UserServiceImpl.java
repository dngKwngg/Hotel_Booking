package com.example.demo.service.impl;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.example.demo.dto.UserDto;
import com.example.demo.dto.request.UserRegisterDto;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto createUser(UserRegisterDto requestDto) {
        String role = "USER";
        if (requestDto.getRole() != null){
            role = requestDto.getRole();
        }

        UserDto userDto = new UserDto();
        userDto.setEmail(requestDto.getEmail());
        userDto.setUsername(requestDto.getUsername());
        userDto.setPhoneNumber(requestDto.getPhoneNumber());
        userDto.setFirstName(requestDto.getFirstName());
        userDto.setLastName(requestDto.getLastName());
        userDto.setRole(role);

//        Role role = roleRepository.findById(requestDto.getRoleId()).orElseThrow(() -> new RuntimeException("Role not found"));

        User user = UserMapper.mapToUser(userDto);

        // hash requestDto.getPassword
        // temp bcrypt
        BCrypt.Hasher hasher = BCrypt.withDefaults();
        String hashedPassword = hasher.hashToString(12, requestDto.getPassword().toCharArray());

        user.setPassword(hashedPassword);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
//        user.setEmail(userDto.getEmail());
//        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setNationality(userDto.getNationality());

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.deleteById(id);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
    }

    @Override
    public void changePassword(Long id, String oldPassword, String newPassword) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (BCrypt.verifyer().verify(oldPassword.toCharArray(), user.getPassword()).verified) {
            BCrypt.Hasher hasher = BCrypt.withDefaults();
            String hashedPassword = hasher.hashToString(12, newPassword.toCharArray());
            user.setPassword(hashedPassword);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Old password is incorrect");
        }
    }
}
