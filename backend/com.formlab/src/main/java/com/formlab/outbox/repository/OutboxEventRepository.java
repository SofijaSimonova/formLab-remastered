package com.formlab.outbox.repository;

import com.formlab.outbox.entity.OutboxEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.List;
import java.util.UUID;

public interface OutboxEventRepository
        extends JpaRepository<OutboxEvent, UUID> {

    List<OutboxEvent> findTop100ByPublishedAtIsNullOrderByCreatedAtAsc();
    @Query(
            value = """
                SELECT *
                FROM outbox_events
                WHERE published_at IS NULL
                ORDER BY created_at ASC
                FOR UPDATE SKIP LOCKED
                LIMIT :batchSize
                """,
            nativeQuery = true
    )
    List<OutboxEvent> findUnpublishedForUpdate(
            @Param("batchSize") int batchSize
    );
}