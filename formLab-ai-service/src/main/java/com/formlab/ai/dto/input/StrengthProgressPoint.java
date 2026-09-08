package com.formlab.ai.dto.input;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record StrengthProgressPoint(
        OffsetDateTime date,
        BigDecimal value
) {
}