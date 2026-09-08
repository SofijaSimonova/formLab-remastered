package com.formlab.ai.kafka;
import com.formlab.ai.kafka.dto.WorkoutSessionCompletedEvent;
import com.formlab.ai.service.ProgressAnalysisCacheService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;
import tools.jackson.databind.json.JsonMapper;

@Component
public class WorkoutSessionCompletedConsumer {

    private final JsonMapper jsonMapper;
    private final ProgressAnalysisCacheService cacheService;

    public WorkoutSessionCompletedConsumer(
            JsonMapper jsonMapper,
            ProgressAnalysisCacheService cacheService
    ) {
        this.jsonMapper = jsonMapper;
        this.cacheService = cacheService;
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

        System.out.println("========== KAFKA CACHE INVALIDATION ==========");
        System.out.println("userId     = " + event.userId());
        System.out.println("exerciseIds = " + event.exerciseIds());

        cacheService.invalidate(
                event.userId(),
                event.exerciseIds()
        );

        System.out.println("========== CACHE INVALIDATION FINISHED ==========");

        acknowledgment.acknowledge();
    }
}