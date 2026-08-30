package com.formlab.exercise.controller;

import com.formlab.exercise.dto.ReferenceResponse;
import com.formlab.exercise.service.BodyPartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/body-parts")
public class BodyPartController {

    private final BodyPartService bodyPartService;

    public BodyPartController(BodyPartService bodyPartService) {
        this.bodyPartService = bodyPartService;
    }

    @GetMapping
    public List<ReferenceResponse> getAllBodyParts() {
        return bodyPartService.getAllBodyParts();
    }
}