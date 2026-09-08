package com.formlab.progress.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record WeeklyVolumeData(
        LocalDate date,
        BigDecimal volume
) {}