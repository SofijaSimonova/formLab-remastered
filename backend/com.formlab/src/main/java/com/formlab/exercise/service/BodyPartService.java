package com.formlab.exercise.service;

import com.formlab.exercise.dto.ReferenceResponse;
import com.formlab.exercise.repository.BodyPartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BodyPartService {

    private final BodyPartRepository bodyPartRepository;

    public BodyPartService(BodyPartRepository bodyPartRepository) {
        this.bodyPartRepository = bodyPartRepository;
    }

    public List<ReferenceResponse> getAllBodyParts() {
        return bodyPartRepository.findAll()
                .stream()
                .map(bodyPart -> new ReferenceResponse(
                        bodyPart.getId(),
                        bodyPart.getName()
                ))
                .toList();
    }
}