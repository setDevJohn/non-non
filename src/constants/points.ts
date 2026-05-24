export const POINTS_RULES = {
  MONDAY: 2,
  TUESDAY_THURSDAY: 1,
  FRIDAY: 3,
  WEEKEND_RECOVERY: 1, // Only for users below average
  HYDRATION_GOAL: 1,
  HYDRATION_WORKOUT_BONUS: 1,
} as const;

export const getPointsForDay = (dayOfWeek: number): number => {
  switch (dayOfWeek) {
    case 1: // Monday
      return POINTS_RULES.MONDAY;
    case 2: // Tuesday
    case 3: // Wednesday
    case 4: // Thursday
      return POINTS_RULES.TUESDAY_THURSDAY;
    case 5: // Friday
      return POINTS_RULES.FRIDAY;
    case 6: // Saturday
    case 0: // Sunday
      return POINTS_RULES.WEEKEND_RECOVERY;
    default:
      return 0;
  }
};
