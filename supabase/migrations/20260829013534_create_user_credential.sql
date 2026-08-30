CREATE TABLE user_credential (
                                 user_id UUID PRIMARY KEY,
                                 password_hash VARCHAR(255) NOT NULL,
                                 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                                 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                                 CONSTRAINT fk_user_credential_user
                                     FOREIGN KEY (user_id)
                                         REFERENCES app_user(id)
                                         ON DELETE CASCADE
);