package com.formlab.ai.kafka;

import com.formlab.ai.kafka.dto.WorkoutSessionCompletedEvent;
import com.formlab.ai.service.ProgressAnalysisCacheService;
import com.formlab.ai.service.ProgressQuestionCacheService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;
import tools.jackson.databind.json.JsonMapper;

@Component
public class WorkoutSessionCompletedConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(
                    WorkoutSessionCompletedConsumer.class
            );

    private final JsonMapper jsonMapper;
    private final ProgressAnalysisCacheService analysisCacheService;
    private final ProgressQuestionCacheService questionCacheService;

    public WorkoutSessionCompletedConsumer(
            JsonMapper jsonMapper,
            ProgressAnalysisCacheService analysisCacheService,
            ProgressQuestionCacheService questionCacheService
    ) {
        this.jsonMapper = jsonMapper;
        this.analysisCacheService =
                analysisCacheService;
        this.questionCacheService =
                questionCacheService;
    }

    @KafkaListener(
            topics = "${formlab.kafka.topics.workout-session-completed}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void consume(
            String message,
            Acknowledgment acknowledgment
    ) throws Exception {

        WorkoutSessionCompletedEvent event =
                jsonMapper.readValue(
                        message,
                        WorkoutSessionCompletedEvent.class
                );

        log.info(
                "Invalidating AI progress caches for userId={} exerciseIds={}",
                event.userId(),
                event.exerciseIds()
        );

        analysisCacheService.invalidate(
                event.userId(),
                event.exerciseIds()
        );

        questionCacheService.invalidate(
                event.userId(),
                event.exerciseIds()
        );

        log.info(
                "AI progress cache invalidation completed for userId={} exerciseIds={}",
                event.userId(),
                event.exerciseIds()
        );

        acknowledgment.acknowledge();
    }
}