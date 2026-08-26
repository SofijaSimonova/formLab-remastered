CREATE TABLE goal (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      name VARCHAR(100) NOT NULL UNIQUE,
                      description TEXT
);

CREATE TABLE user_goal (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           user_id UUID NOT NULL,
                           goal_id UUID NOT NULL,
                           created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                           CONSTRAINT fk_user_goal_user
                               FOREIGN KEY (user_id)
                                   REFERENCES app_user(id)
                                   ON DELETE CASCADE,

                           CONSTRAINT fk_user_goal_goal
                               FOREIGN KEY (goal_id)
                                   REFERENCES goal(id)
                                   ON DELETE CASCADE,

                           CONSTRAINT uk_user_goal
                               UNIQUE (user_id, goal_id)
);