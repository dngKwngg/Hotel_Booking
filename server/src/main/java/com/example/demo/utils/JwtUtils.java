package com.example.demo.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    private static final Long ACCESS_TOKEN_VALIDITY_SECONDS = 5 * 60 * 60L; // 5 hours

    @Value("${jwt.secret}")
    private String SECKET_KEY;

    // Get Secret Key
    // This method is used to get the secret key for signing the JWT token
    // It uses the HMAC SHA algorithm to generate the key
    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(SECKET_KEY.getBytes());
    }

    // Create JWT Access Token
    public String generateAccessToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY_SECONDS * 1000))
                .signWith(getSecretKey())
                .compact();
    }

    // Validate JWT Access Token
    // This method is used to validate the JWT token
    // It checks if the token is expired or not
    // If the token is expired, it throws an exception
    // If the token is valid, it returns true
    // If the token is invalid, it returns false
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Get Username from JWT Access Token
    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Get roles from JWT Access Token
    public List<String> getRoles(String token) {
        Claims claim = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claim.get("role", List.class);
    }
}
