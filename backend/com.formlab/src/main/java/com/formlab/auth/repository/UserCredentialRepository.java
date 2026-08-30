package com.formlab.auth.repository;

import com.formlab.auth.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserCredentialRepository
        extends JpaRepository<UserCredential, UUID> {

    @Query("""
            SELECT uc
            FROM UserCredential uc
            JOIN FETCH uc.user
            WHERE LOWER(uc.user.email) = LOWER(:email)
            """)
    Optional<UserCredential> findByUserEmailIgnoreCase(
            @Param("email") String email
    );
}