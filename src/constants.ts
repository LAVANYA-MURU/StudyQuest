
export const POINTS_PER_TASK = 10;
export const POINTS_PER_HABIT = 5;

export const LEVEL_THRESHOLDS = [
  0,    // Level 1
  100,  // Level 2
  250,  // Level 3
  500,  // Level 4
  1000, // Level 5
  2000, // Level 6
];

export const getLevelDetails = (points: number) => {
  let level = 1;
  while (level < LEVEL_THRESHOLDS.length && points >= LEVEL_THRESHOLDS[level]) {
    level++;
  }
  
  const currentLevelPoints = LEVEL_THRESHOLDS[level - 1];
  const nextLevelPoints = LEVEL_THRESHOLDS[level] || Infinity;
  const pointsInLevel = points - currentLevelPoints;
  const pointsForNextLevel = nextLevelPoints - currentLevelPoints;
  const progress = (pointsInLevel / pointsForNextLevel) * 100;
  
  return {
    level,
    progress: isFinite(progress) ? progress : 100,
    pointsToNextLevel: isFinite(nextLevelPoints) ? nextLevelPoints - points : 0,
  };
};
