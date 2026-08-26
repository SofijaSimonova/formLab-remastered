package com.formlab.exercise.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "exercise_focus_variation",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_exercise_focus_variation",
                columnNames = {"exercise_id", "focus_body_part_id"}
        )
)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ExerciseFocusVariation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "focus_body_part_id", nullable = false)
    private BodyPart focusBodyPart;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 255)
    private String animationReference;
}