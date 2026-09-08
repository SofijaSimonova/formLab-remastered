package com.formlab.workout.event;

import com.formlab.workout.service.ProgressAnalysisCacheInvalidationService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class WorkoutSessionCompletedEventListener {

    private final ProgressAnalysisCacheInvalidationService cacheInvalidationService;

    public WorkoutSessionCompletedEventListener(
            ProgressAnalysisCacheInvalidationService cacheInvalidationService
    ) {
        this.cacheInvalidationService =
                cacheInvalidationService;
    }

    @TransactionalEventListener(
            phase = TransactionPhase.AFTER_COMMIT
    )
    public void handle(
            WorkoutSessionCompletedEvent event
    ) {
        cacheInvalidationService.invalidate(
                event.userId(),
                event.exerciseIds()
        );
    }
}