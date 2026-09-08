package com.formlab.progress.repository;

import java.math.BigDecimal;
import java.time.Instant;

public interface ProgressDailyVolumeProjection {

    Instant getDate();

    BigDecimal getVolume();
}