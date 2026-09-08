package com.formlab.outbox.service;

import com.formlab.outbox.entity.OutboxEvent;
import com.formlab.outbox.repository.OutboxEventRepository;
import tools.jackson.databind.json.JsonMapper;
import org.springframework.stereotype.Service;

@Service
public class OutboxEventService {

    private final OutboxEventRepository outboxEventRepository;
    private final JsonMapper jsonMapper;

    public OutboxEventService(
            OutboxEventRepository outboxEventRepository,
            JsonMapper jsonMapper
    ) {
        this.outboxEventRepository = outboxEventRepository;
        this.jsonMapper = jsonMapper;
    }

    public void saveEvent(
            String eventType,
            Object event
    ) {

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType(eventType);
        String payload = jsonMapper.writeValueAsString(event);
        outboxEvent.setPayload(payload);
        outboxEventRepository.save(outboxEvent);
    }
}