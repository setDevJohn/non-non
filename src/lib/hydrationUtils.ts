export const calculateHydrationGoal = (weightKg: number, mode: '28ml' | '35ml'): number => {
  const multiplier = mode === '28ml' ? 28 : 35;
  return Math.round(weightKg * multiplier);
};

export const getHydrationProgress = (current: number, goal: number): number => {
  if (goal === 0) return 0;
  return (current / goal) * 100;
};

export const getHydrationStatus = (current: number, goal: number): 'low' | 'medium' | 'high' | 'completed' => {
  const progress = getHydrationProgress(current, goal);
  if (progress >= 100) return 'completed';
  if (progress >= 75) return 'high';
  if (progress >= 50) return 'medium';
  return 'low';
};
