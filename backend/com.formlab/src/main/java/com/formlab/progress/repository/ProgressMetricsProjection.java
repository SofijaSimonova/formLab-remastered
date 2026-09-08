package com.formlab.progress.repository;

import java.math.BigDecimal;

public interface ProgressMetricsProjection {

    Long getTotalWorkouts();

    Long getTotalSets();

    BigDecimal getTotalVolume();
}