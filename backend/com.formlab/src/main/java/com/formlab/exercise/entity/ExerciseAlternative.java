package com.formlab.exercise.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@Entity
@Table(
        name = "exercise_alternative",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_exercise_alternative",
                columnNames = {"exercise_id", "alternative_exercise_id"}
        )
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ExerciseAlternative {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "alternative_exercise_id", nullable = false)
    private Exercise alternativeExercise;

    @Column(length = 255)
    private String reason;
}