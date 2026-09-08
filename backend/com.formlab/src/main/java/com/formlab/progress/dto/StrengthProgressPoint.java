package com.formlab.progress.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record StrengthProgressPoint(
        OffsetDateTime date,
        BigDecimal value
) {
}