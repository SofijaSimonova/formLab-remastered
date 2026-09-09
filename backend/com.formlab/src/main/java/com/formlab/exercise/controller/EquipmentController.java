package com.formlab.exercise.controller;

import com.formlab.exercise.dto.ReferenceResponse;
import com.formlab.exercise.service.EquipmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(
            EquipmentService equipmentService
    ) {
        this.equipmentService = equipmentService;
    }

    @GetMapping
    public List<ReferenceResponse> getAllEquipment() {
        return equipmentService.getAllEquipment();
    }
}