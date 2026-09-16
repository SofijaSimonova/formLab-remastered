package com.formlab.ai.service;

import com.formlab.ai.dto.input.StrengthProgressRange;
import com.formlab.ai.dto.output.ProgressQuestionResponse;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.HexFormat;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ProgressQuestionCacheService {

    private static final String CACHE_PREFIX =
            "progress-question:";

    private static final String INDEX_PREFIX =
            "progress-question:index:";

    private static final Duration CACHE_TTL =
            Duration.ofHours(24);

    private final StringRedisTemplate redisTemplate;
    private final JsonMapper jsonMapper;

    public ProgressQuestionCacheService(
            StringRedisTemplate redisTemplate,
            JsonMapper jsonMapper
    ) {
        this.redisTemplate = redisTemplate;
        this.jsonMapper = jsonMapper;
    }

    public ProgressQuestionResponse get(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range,
            String question
    ) {
        String cacheKey =
                buildCacheKey(
                        userId,
                        exerciseId,
                        range,
                        question
                );

        String cachedResponse =
                redisTemplate.opsForValue().get(cacheKey);

        if (cachedResponse == null) {
            return null;
        }

        try {
            return jsonMapper.readValue(
                    cachedResponse,
                    ProgressQuestionResponse.class
            );
        } catch (JacksonException e) {
            throw new IllegalStateException(
                    "Failed to deserialize cached progress question response",
                    e
            );
        }
    }

    public void save(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range,
            String question,
            ProgressQuestionResponse response
    ) {
        String cacheKey =
                buildCacheKey(
                        userId,
                        exerciseId,
                        range,
                        question
                );

        String indexKey =
                buildIndexKey(
                        userId,
                        exerciseId
                );

        try {
            String json =
                    jsonMapper.writeValueAsString(
                            response
                    );

            redisTemplate.opsForValue().set(
                    cacheKey,
                    json,
                    CACHE_TTL
            );

            redisTemplate.opsForSet().add(
                    indexKey,
                    cacheKey
            );

            redisTemplate.expire(
                    indexKey,
                    CACHE_TTL
            );

        } catch (JacksonException e) {
            throw new IllegalStateException(
                    "Failed to serialize progress question response for cache",
                    e
            );
        }
    }

    public void invalidate(
            UUID userId,
            List<UUID> exerciseIds
    ) {
        if (
                exerciseIds == null ||
                        exerciseIds.isEmpty()
        ) {
            return;
        }

        for (UUID exerciseId : exerciseIds) {
            String indexKey =
                    buildIndexKey(
                            userId,
                            exerciseId
                    );

            Set<String> cacheKeys =
                    redisTemplate
                            .opsForSet()
                            .members(indexKey);

            if (
                    cacheKeys == null ||
                            cacheKeys.isEmpty()
            ) {
                continue;
            }

            redisTemplate.delete(cacheKeys);
            redisTemplate.delete(indexKey);
        }
    }

    private String buildCacheKey(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range,
            String question
    ) {
        return CACHE_PREFIX
                + userId
                + ":"
                + exerciseId
                + ":"
                + range.name()
                + ":"
                + hashQuestion(question);
    }

    private String buildIndexKey(
            UUID userId,
            UUID exerciseId
    ) {
        return INDEX_PREFIX
                + userId
                + ":"
                + exerciseId;
    }

    private String hashQuestion(
            String question
    ) {
        String normalizedQuestion =
                question
                        .trim()
                        .replaceAll(
                                "\\s+",
                                " "
                        )
                        .toLowerCase();

        try {
            MessageDigest digest =
                    MessageDigest.getInstance(
                            "SHA-256"
                    );

            byte[] hash =
                    digest.digest(
                            normalizedQuestion.getBytes(
                                    StandardCharsets.UTF_8
                            )
                    );

            return HexFormat.of()
                    .formatHex(hash);

        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(
                    "SHA-256 algorithm is not available",
                    e
            );
        }
    }
}