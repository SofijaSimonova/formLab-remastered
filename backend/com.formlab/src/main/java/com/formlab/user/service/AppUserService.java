package com.formlab.user.service;

import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.user.dto.AppUserResponse;
import com.formlab.user.dto.UpdateAppUserRequest;
import com.formlab.user.entity.AppUser;
import com.formlab.user.mapper.AppUserMapper;
import com.formlab.user.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final AppUserMapper appUserMapper;

    public AppUserService(
            AppUserRepository appUserRepository,
            AppUserMapper appUserMapper
    ) {
        this.appUserRepository = appUserRepository;
        this.appUserMapper = appUserMapper;
    }

    public AppUserResponse getUserById(UUID id) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        return appUserMapper.toResponse(user);
    }

    public AppUserResponse updateUser(
            UUID id,
            UpdateAppUserRequest request
    ) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        appUserMapper.updateEntity(request, user);

        return appUserMapper.toResponse(
                appUserRepository.save(user)
        );
    }
}