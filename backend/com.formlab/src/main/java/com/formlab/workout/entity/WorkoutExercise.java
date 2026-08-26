package com.formlab.workout.entity;

import com.formlab.exercise.entity.Exercise;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "workout_exercise",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_workout_exercise_order",
                columnNames = {"workout_id", "exercise_order"}
        )
)
@Getter
@Setter
@NoArgsConstructor
public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "exercise_order", nullable = false)
    private Integer exerciseOrder;

    @Column(name = "target_sets")
    private Integer targetSets;

    @Column(name = "target_reps")
    private Integer targetReps;
}