CREATE TABLE body_part (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE movement_pattern (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE equipment (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tag (
                     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                     name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE avoid_condition (
                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                 name VARCHAR(100) NOT NULL UNIQUE,
                                 description TEXT
);

CREATE TABLE exercise (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                          name VARCHAR(150) NOT NULL UNIQUE,

                          description TEXT,
                          instructions TEXT,

                          movement_pattern_id UUID,

                          CONSTRAINT fk_exercise_movement_pattern
                              FOREIGN KEY (movement_pattern_id)
                                  REFERENCES movement_pattern(id)
                                  ON DELETE SET NULL
);

CREATE TABLE exercise_body_part (
                                    exercise_id UUID NOT NULL,
                                    body_part_id UUID NOT NULL,

                                    PRIMARY KEY (exercise_id, body_part_id),

                                    CONSTRAINT fk_exercise_body_part_exercise
                                        FOREIGN KEY (exercise_id)
                                            REFERENCES exercise(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT fk_exercise_body_part_body_part
                                        FOREIGN KEY (body_part_id)
                                            REFERENCES body_part(id)
                                            ON DELETE CASCADE
);

CREATE TABLE exercise_equipment (
                                    exercise_id UUID NOT NULL,
                                    equipment_id UUID NOT NULL,

                                    PRIMARY KEY (exercise_id, equipment_id),

                                    CONSTRAINT fk_exercise_equipment_exercise
                                        FOREIGN KEY (exercise_id)
                                            REFERENCES exercise(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT fk_exercise_equipment_equipment
                                        FOREIGN KEY (equipment_id)
                                            REFERENCES equipment(id)
                                            ON DELETE CASCADE
);


CREATE TABLE exercise_tag (
                              exercise_id UUID NOT NULL,
                              tag_id UUID NOT NULL,

                              PRIMARY KEY (exercise_id, tag_id),

                              CONSTRAINT fk_exercise_tag_exercise
                                  FOREIGN KEY (exercise_id)
                                      REFERENCES exercise(id)
                                      ON DELETE CASCADE,

                              CONSTRAINT fk_exercise_tag_tag
                                  FOREIGN KEY (tag_id)
                                      REFERENCES tag(id)
                                      ON DELETE CASCADE
);


CREATE TABLE exercise_alternative (
                                      exercise_id UUID NOT NULL,
                                      alternative_exercise_id UUID NOT NULL,

                                      PRIMARY KEY (exercise_id, alternative_exercise_id),

                                      CONSTRAINT fk_exercise_alternative_exercise
                                          FOREIGN KEY (exercise_id)
                                              REFERENCES exercise(id)
                                              ON DELETE CASCADE,

                                      CONSTRAINT fk_exercise_alternative_alternative
                                          FOREIGN KEY (alternative_exercise_id)
                                              REFERENCES exercise(id)
                                              ON DELETE CASCADE,

                                      CONSTRAINT chk_exercise_alternative_not_self
                                          CHECK (exercise_id <> alternative_exercise_id)
);



CREATE TABLE exercise_avoid_condition (
                                          exercise_id UUID NOT NULL,
                                          avoid_condition_id UUID NOT NULL,

                                          PRIMARY KEY (exercise_id, avoid_condition_id),

                                          CONSTRAINT fk_exercise_avoid_condition_exercise
                                              FOREIGN KEY (exercise_id)
                                                  REFERENCES exercise(id)
                                                  ON DELETE CASCADE,

                                          CONSTRAINT fk_exercise_avoid_condition_condition
                                              FOREIGN KEY (avoid_condition_id)
                                                  REFERENCES avoid_condition(id)
                                                  ON DELETE CASCADE
);


CREATE TABLE exercise_focus_variation (
                                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                          exercise_id UUID NOT NULL,

                                          focus_body_part_id UUID NOT NULL,

                                          name VARCHAR(100) NOT NULL,
                                          description TEXT,

                                          animation_reference VARCHAR(255),

                                          CONSTRAINT fk_focus_variation_exercise
                                              FOREIGN KEY (exercise_id)
                                                  REFERENCES exercise(id)
                                                  ON DELETE CASCADE,

                                          CONSTRAINT fk_focus_variation_body_part
                                              FOREIGN KEY (focus_body_part_id)
                                                  REFERENCES body_part(id)
                                                  ON DELETE CASCADE,

                                          CONSTRAINT uq_exercise_focus_variation
                                              UNIQUE (exercise_id, focus_body_part_id)
);

CREATE INDEX idx_exercise_movement_pattern
    ON exercise(movement_pattern_id);

CREATE INDEX idx_exercise_body_part_body_part
    ON exercise_body_part(body_part_id);

CREATE INDEX idx_exercise_equipment_equipment
    ON exercise_equipment(equipment_id);

CREATE INDEX idx_exercise_tag_tag
    ON exercise_tag(tag_id);

CREATE INDEX idx_exercise_alternative_alternative
    ON exercise_alternative(alternative_exercise_id);

CREATE INDEX idx_exercise_avoid_condition_condition
    ON exercise_avoid_condition(avoid_condition_id);

CREATE INDEX idx_exercise_focus_variation_body_part
    ON exercise_focus_variation(focus_body_part_id);