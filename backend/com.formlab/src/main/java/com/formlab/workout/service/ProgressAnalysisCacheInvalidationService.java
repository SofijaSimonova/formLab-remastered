package com.formlab.workout.service;

import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProgressAnalysisCacheInvalidationService {

    private static final String CACHE_PREFIX =
            "progress-analysis:";

    private final StringRedisTemplate redisTemplate;

    public ProgressAnalysisCacheInvalidationService(
            StringRedisTemplate redisTemplate
    ) {
        this.redisTemplate = redisTemplate;
    }

    public void invalidate(
            UUID userId,
            List<UUID> exerciseIds
    ) {
        for (UUID exerciseId : exerciseIds) {
            invalidateExercise(userId, exerciseId);
        }
    }

    private void invalidateExercise(
            UUID userId,
            UUID exerciseId
    ) {
        String pattern =
                CACHE_PREFIX
                        + userId
                        + ":"
                        + exerciseId
                        + ":*";

        List<String> keys = new ArrayList<>();

        ScanOptions options =
                ScanOptions.scanOptions()
                        .match(pattern)
                        .count(100)
                        .build();

        try (Cursor<String> cursor =
                     redisTemplate.scan(options)) {

            cursor.forEachRemaining(keys::add);
        }

        if (!keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}