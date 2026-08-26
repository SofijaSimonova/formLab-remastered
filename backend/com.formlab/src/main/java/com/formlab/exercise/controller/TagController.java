package com.formlab.exercise.controller;

import com.formlab.exercise.dto.TagResponse;
import com.formlab.exercise.service.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<TagResponse> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/{id}")
    public TagResponse getTagById(@PathVariable UUID id) {
        return tagService.getTagById(id);
    }
}