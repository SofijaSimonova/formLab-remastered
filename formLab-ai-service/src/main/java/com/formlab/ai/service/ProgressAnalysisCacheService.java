package com.formlab.ai.service;

import com.formlab.ai.dto.output.ProgressAnalysisResponse;
import com.formlab.ai.dto.input.StrengthProgressRange;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ProgressAnalysisCacheService {

    private static final String CACHE_PREFIX = "progress-analysis:";
    private static final String INDEX_PREFIX = "progress-analysis:index:";

    private static final Duration CACHE_TTL =
            Duration.ofHours(24);

    private final StringRedisTemplate redisTemplate;
    private final JsonMapper jsonMapper;

    public ProgressAnalysisCacheService(
            StringRedisTemplate redisTemplate,
            JsonMapper jsonMapper
    ) {
        this.redisTemplate = redisTemplate;
        this.jsonMapper = jsonMapper;
    }

    public ProgressAnalysisResponse get(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range
    ) {
        String cacheKey = buildCacheKey(
                userId,
                exerciseId,
                range
        );

        String cachedResponse =
                redisTemplate.opsForValue().get(cacheKey);

        if (cachedResponse == null) {
            return null;
        }

        try {
            return jsonMapper.readValue(
                    cachedResponse,
                    ProgressAnalysisResponse.class
            );
        } catch (JacksonException e) {
            throw new IllegalStateException(
                    "Failed to deserialize cached progress analysis",
                    e
            );
        }
    }

    public void save(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range,
            ProgressAnalysisResponse response
    ) {
        String cacheKey = buildCacheKey(
                userId,
                exerciseId,
                range
        );

        String indexKey = buildIndexKey(
                userId,
                exerciseId
        );

        try {
            String json =
                    jsonMapper.writeValueAsString(response);

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
                    "Failed to serialize progress analysis for cache",
                    e
            );
        }
    }

    public void invalidate(
            UUID userId,
            List<UUID> exerciseIds
    ) {
        if (exerciseIds == null || exerciseIds.isEmpty()) {
            return;
        }

        for (UUID exerciseId : exerciseIds) {

            String indexKey =
                    buildIndexKey(
                            userId,
                            exerciseId
                    );

            Set<String> cacheKeys =
                    redisTemplate.opsForSet().members(indexKey);

            if (cacheKeys == null || cacheKeys.isEmpty()) {
                continue;
            }

            redisTemplate.delete(cacheKeys);
            redisTemplate.delete(indexKey);
        }
    }

    private String buildCacheKey(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range
    ) {
        return CACHE_PREFIX
                + userId
                + ":"
                + exerciseId
                + ":"
                + range.name();
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
}