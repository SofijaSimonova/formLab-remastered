ALTER TABLE app_user
    ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'USER',
    ADD COLUMN token_version INTEGER NOT NULL DEFAULT 0;

ALTER TABLE app_user
    ADD CONSTRAINT app_user_role_check
        CHECK (role IN ('USER', 'ADMIN'));