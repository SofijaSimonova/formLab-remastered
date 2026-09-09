package com.formlab.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long expiration;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration
    ) {
        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
        this.expiration = expiration;
    }

    public String generateToken(
            UUID userId,
            String email,
            Integer tokenVersion
    ) {
        Date now = new Date();
        Date expiry = new Date(
                now.getTime() + expiration
        );

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId.toString())
                .claim("tokenVersion", tokenVersion)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(secretKey)
                .compact();
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public UUID extractUserId(String token) {
        String userId = extractClaims(token)
                .get("userId", String.class);

        return UUID.fromString(userId);
    }

    public Integer extractTokenVersion(String token) {
        return extractClaims(token)
                .get("tokenVersion", Integer.class);
    }

    public boolean isTokenValid(
            String token,
            String email,
            Integer currentTokenVersion
    ) {
        try {
            String tokenEmail = extractEmail(token);
            Integer tokenVersion = extractTokenVersion(token);

            return tokenEmail.equalsIgnoreCase(email)
                    && tokenVersion != null
                    && tokenVersion.equals(currentTokenVersion)
                    && !extractClaims(token)
                    .getExpiration()
                    .before(new Date());

        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}