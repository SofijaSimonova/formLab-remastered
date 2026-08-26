CREATE TABLE app_user (
                          id UUID PRIMARY KEY,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          first_name VARCHAR(100),
                          last_name VARCHAR(100),
                          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);