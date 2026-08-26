package com.formlab.exercise.service;

import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.dto.TagResponse;
import com.formlab.exercise.entity.Tag;
import com.formlab.exercise.mapper.TagMapper;
import com.formlab.exercise.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    public TagService(
            TagRepository tagRepository,
            TagMapper tagMapper
    ) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
    }

    public List<TagResponse> getAllTags() {
        return tagRepository.findAll()
                .stream()
                .map(tagMapper::toResponse)
                .toList();
    }

    public TagResponse getTagById(UUID id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tag not found")
                );

        return tagMapper.toResponse(tag);
    }
}