import type { ServerPopulationSnapshot } from './serverPulse';

export interface RetentionBuckets {
  h6: number | null;
  h12: number | null;
  h18: number | null;
  h24: number | null;
  h30: number | null;
}

export type PulseStatus = 'ready' | 'collecting' | 'insufficient_data' | 'unknown_wipe';
export type HealthLabel = 'Strong Retention' | 'Moderate Drop' | 'Fast Dying' | 'Not enough data';
export type EarlyPredictionState = 'first_seen' | 'collecting' | 'early_trend' | 'retention_ready';
export type EarlyTrendDirection = 'population_up' | 'population_stable' | 'population_down' | null;

export interface PulseSummary {
  status: PulseStatus;
  buckets: RetentionBuckets;
  peakPlayers: number | null;
  snapshotCount: number;
  lastObservedAt: string | null;
  firstObservedAt: string | null;
  healthLabel: HealthLabel;
  earlyPredictionState: EarlyPredictionState;
  earlyTrendDirection: EarlyTrendDirection;
}

export function calculatePulseSummary(snapshots: ServerPopulationSnapshot[], wipe_at: string | null | undefined): PulseSummary {
  if (!snapshots || snapshots.length === 0) {
    return {
      status: 'collecting',
      buckets: { h6: null, h12: null, h18: null, h24: null, h30: null },
      peakPlayers: null,
      snapshotCount: 0,
      lastObservedAt: null,
      firstObservedAt: null,
      healthLabel: 'Not enough data',
      earlyPredictionState: 'first_seen',
      earlyTrendDirection: null
    };
  }

  const snapshotCount = snapshots.length;
  // Snapshots are usually returned newest first from our API if ordered by observed_at desc, but we should sort to be safe
  const sorted = [...snapshots].sort((a, b) => new Date(a.observed_at).getTime() - new Date(b.observed_at).getTime());
  const firstObservedAt = sorted[0].observed_at;
  const lastObservedAt = sorted[sorted.length - 1].observed_at;
  
  let earlyPredictionState: EarlyPredictionState = 'collecting';
  let earlyTrendDirection: EarlyTrendDirection = null;

  if (snapshotCount === 1) {
    earlyPredictionState = 'first_seen';
  } else if (snapshotCount >= 2 && snapshotCount <= 3) {
    earlyPredictionState = 'collecting';
  } else if (snapshotCount > 3) {
    const hoursDiff = (new Date(lastObservedAt).getTime() - new Date(firstObservedAt).getTime()) / (1000 * 60 * 60);
    if (hoursDiff >= 2) {
       earlyPredictionState = 'early_trend';
       // Simple trend calculation: average of first two vs average of last two
       const firstTwoAvg = ((sorted[0].players || 0) + (sorted[1].players || 0)) / 2;
       const lastTwoAvg = ((sorted[sorted.length - 1].players || 0) + (sorted[sorted.length - 2].players || 0)) / 2;
       
       if (lastTwoAvg > firstTwoAvg * 1.05) {
         earlyTrendDirection = 'population_up';
       } else if (lastTwoAvg < firstTwoAvg * 0.95) {
         earlyTrendDirection = 'population_down';
       } else {
         earlyTrendDirection = 'population_stable';
       }
    }
  }

  if (!wipe_at) {
    return {
      status: 'unknown_wipe',
      buckets: { h6: null, h12: null, h18: null, h24: null, h30: null },
      peakPlayers: null,
      snapshotCount,
      lastObservedAt,
      firstObservedAt,
      healthLabel: 'Not enough data',
      earlyPredictionState,
      earlyTrendDirection
    };
  }

  const wipeTime = new Date(wipe_at).getTime();
  
  // Filter snapshots that happened strictly after the wipe
  const validSnapshots = snapshots.filter(s => new Date(s.observed_at).getTime() >= wipeTime);
  
  if (validSnapshots.length === 0) {
    return {
      status: 'insufficient_data',
      buckets: { h6: null, h12: null, h18: null, h24: null, h30: null },
      peakPlayers: null,
      snapshotCount,
      lastObservedAt,
      firstObservedAt,
      healthLabel: 'Not enough data',
      earlyPredictionState,
      earlyTrendDirection
    };
  }

  // Find Peak Players in the first 24 hours of wipe
  const earlySnapshots = validSnapshots.filter(s => {
    const ageHrs = (new Date(s.observed_at).getTime() - wipeTime) / (1000 * 60 * 60);
    return ageHrs >= 0 && ageHrs <= 24;
  });

  let peakPlayers = 0;
  for (const s of earlySnapshots) {
    if (s.players && s.players > peakPlayers) {
      peakPlayers = s.players;
    }
  }

  if (peakPlayers === 0) {
    // Fallback to absolute max if early snapshots are weird
    for (const s of validSnapshots) {
      if (s.players && s.players > peakPlayers) {
        peakPlayers = s.players;
      }
    }
  }
  
  if (peakPlayers === 0) {
    return {
      status: 'insufficient_data',
      buckets: { h6: null, h12: null, h18: null, h24: null, h30: null },
      peakPlayers: 0,
      snapshotCount,
      lastObservedAt,
      firstObservedAt,
      healthLabel: 'Not enough data',
      earlyPredictionState,
      earlyTrendDirection
    };
  }

  // Helper to get nearest snapshot for an hour bucket
  const getRetentionPercent = (targetHour: number): number | null => {
    const targetTime = wipeTime + (targetHour * 60 * 60 * 1000);
    const tolerance = 2 * 60 * 60 * 1000; // +/- 2 hours tolerance
    
    let closest: ServerPopulationSnapshot | null = null;
    let minDiff = Infinity;

    for (const s of validSnapshots) {
      const sTime = new Date(s.observed_at).getTime();
      const diff = Math.abs(sTime - targetTime);
      if (diff <= tolerance && diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    }

    if (closest && closest.players !== null) {
      return Math.round((closest.players / peakPlayers) * 100);
    }
    return null;
  };

  const buckets = {
    h6: getRetentionPercent(6),
    h12: getRetentionPercent(12),
    h18: getRetentionPercent(18),
    h24: getRetentionPercent(24),
    h30: getRetentionPercent(30)
  };

  let healthLabel: HealthLabel = 'Not enough data';
  
  if (buckets.h24 !== null) {
    if (buckets.h24 >= 60) healthLabel = 'Strong Retention';
    else if (buckets.h24 >= 30) healthLabel = 'Moderate Drop';
    else healthLabel = 'Fast Dying';
  } else if (buckets.h12 !== null) {
    if (buckets.h12 >= 70) healthLabel = 'Strong Retention';
    else if (buckets.h12 >= 40) healthLabel = 'Moderate Drop';
    else healthLabel = 'Fast Dying';
  }

  if (buckets.h12 !== null || buckets.h24 !== null) {
    earlyPredictionState = 'retention_ready';
  }

  return {
    status: 'ready',
    buckets,
    peakPlayers,
    snapshotCount,
    lastObservedAt,
    firstObservedAt,
    healthLabel,
    earlyPredictionState,
    earlyTrendDirection
  };
}
