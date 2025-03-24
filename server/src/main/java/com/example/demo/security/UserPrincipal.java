package com.example.demo.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    private Long userId;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
}
