CREATE TABLE outbox_events (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                               event_type VARCHAR(100) NOT NULL,

                               payload JSONB NOT NULL,

                               created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                               published_at TIMESTAMPTZ,

                               attempts INTEGER NOT NULL DEFAULT 0,

                               last_error TEXT
);

CREATE INDEX idx_outbox_events_pending
    ON outbox_events (created_at)
    WHERE published_at IS NULL;