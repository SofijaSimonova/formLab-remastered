package com.formlab.workout.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "workout_set",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_workout_set_number",
                columnNames = {"workout_exercise_id", "set_number"}
        )
)
@Getter
@Setter
@NoArgsConstructor
public class WorkoutSet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "workout_exercise_id", nullable = false)
    private WorkoutExercise workoutExercise;

    @Column(name = "set_number", nullable = false)
    private Integer setNumber;

    @Column(precision = 8, scale = 2)
    private BigDecimal weight;

    @Column(nullable = false)
    private Integer reps;

    @Column(name = "completed_at", nullable = false, updatable = false)
    private OffsetDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        completedAt = OffsetDateTime.now();
    }
}