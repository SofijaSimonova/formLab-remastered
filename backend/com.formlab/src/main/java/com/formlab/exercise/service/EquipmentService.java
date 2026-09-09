package com.formlab.exercise.service;

import com.formlab.exercise.dto.ReferenceResponse;
import com.formlab.exercise.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public EquipmentService(
            EquipmentRepository equipmentRepository
    ) {
        this.equipmentRepository = equipmentRepository;
    }

    public List<ReferenceResponse> getAllEquipment() {
        return equipmentRepository.findAll()
                .stream()
                .map(equipment -> new ReferenceResponse(
                        equipment.getId(),
                        equipment.getName()
                ))
                .toList();
    }
}