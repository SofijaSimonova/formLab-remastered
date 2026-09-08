package com.formlab.progress.repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;

public interface StrengthProgressProjection {

    Instant getDate();

    BigDecimal getValue();
}