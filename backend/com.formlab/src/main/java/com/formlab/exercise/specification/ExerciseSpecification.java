package com.formlab.exercise.specification;

import com.formlab.exercise.entity.Exercise;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class ExerciseSpecification {

    public static Specification<Exercise> search(String search) {
        return (root, query, criteriaBuilder) -> {

            if (search == null || search.isBlank()) {
                return null;
            }

            String pattern = "%" + search.trim().toLowerCase() + "%";

            return criteriaBuilder.or(
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("name")),
                            pattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("description")),
                            pattern
                    )
            );
        };
    }

    public static Specification<Exercise> hasBodyPart(UUID bodyPartId) {
        return (root, query, criteriaBuilder) -> {

            if (bodyPartId == null) {
                return null;
            }

            return criteriaBuilder.equal(
                    root.join("bodyParts").get("id"),
                    bodyPartId
            );
        };
    }
}