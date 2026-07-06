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

export interface PulseSummary {
  status: PulseStatus;
  buckets: RetentionBuckets;
  peakPlayers: number | null;
  snapshotCount: number;
  lastObservedAt: string | null;
  healthLabel: HealthLabel;
}

export function calculatePulseSummary(snapshots: ServerPopulationSnapshot[], wipe_at: string | null | undefined): PulseSummary {
  if (!snapshots || snapshots.length === 0) {
    return {
      status: 'collecting',
      buckets: { h6: null, h12: null, h18: null, h24: null, h30: null },
      peakPlayers: null,
      snapshotCount: 0,
      lastObservedAt: null,
      healthLabel: 'Not enough data'
    };
  }

  const snapshotCount = snapshots.length;
  const lastObservedAt = snapshots[0].observed_at;

  if (!wipe_at) {
    return {
      status: 'unknown_wipe',
      buckets: { h6: null, h12: null, h18: null, h24: null, h30: null },
      peakPlayers: null,
      snapshotCount,
      lastObservedAt,
      healthLabel: 'Not enough data'
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
      healthLabel: 'Not enough data'
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
      healthLabel: 'Not enough data'
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

  return {
    status: 'ready',
    buckets,
    peakPlayers,
    snapshotCount,
    lastObservedAt,
    healthLabel
  };
}
