package com.formlab.user.mapper;

import com.formlab.user.dto.AppUserResponse;
import com.formlab.user.dto.UpdateAppUserRequest;
import com.formlab.user.entity.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AppUserMapper {

    AppUserResponse toResponse(AppUser user);

    void updateEntity(
            UpdateAppUserRequest request,
            @MappingTarget AppUser user
    );
}