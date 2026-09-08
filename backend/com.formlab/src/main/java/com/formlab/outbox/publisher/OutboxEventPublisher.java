package com.formlab.outbox.publisher;

import com.formlab.outbox.entity.OutboxEvent;
import com.formlab.outbox.repository.OutboxEventRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class OutboxEventPublisher {

    private static final int BATCH_SIZE = 50;

    private final OutboxEventRepository outboxEventRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final String workoutSessionCompletedTopic;

    public OutboxEventPublisher(
            OutboxEventRepository outboxEventRepository,
            KafkaTemplate<String, String> kafkaTemplate,
            @Value("${formlab.kafka.topics.workout-session-completed}")
            String workoutSessionCompletedTopic
    ) {
        this.outboxEventRepository = outboxEventRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.workoutSessionCompletedTopic = workoutSessionCompletedTopic;
    }

    @Scheduled(fixedDelayString = "${formlab.outbox.publisher.delay-ms:1000}")
    @Transactional
    public void publishUnpublishedEvents() {

        List<OutboxEvent> events =
                outboxEventRepository.findUnpublishedForUpdate(BATCH_SIZE);

        for (OutboxEvent event : events) {
            publish(event);
        }
    }

    private void publish(OutboxEvent event) {

        String topic = resolveTopic(event.getEventType());

        try {
            kafkaTemplate
                    .send(
                            topic,
                            event.getId().toString(),
                            event.getPayload()
                    )
                    .get(30, TimeUnit.SECONDS);

            event.setPublishedAt(OffsetDateTime.now());

        } catch (Exception e) {

            event.setAttempts(event.getAttempts() + 1);
            event.setLastError(truncateErrorMessage(e));
        }
    }

    private String resolveTopic(String eventType) {

        return switch (eventType) {
            case "WORKOUT_SESSION_COMPLETED" ->
                    workoutSessionCompletedTopic;

            default ->
                    throw new IllegalArgumentException(
                            "Unsupported outbox event type: " + eventType
                    );
        };
    }

    private String truncateErrorMessage(Exception exception) {

        String message = exception.getMessage();

        if (message == null) {
            message = exception.getClass().getSimpleName();
        }

        return message.length() > 2000
                ? message.substring(0, 2000)
                : message;
    }
}