
export enum Screen {
  SPLASH = 'SPLASH',
  HOME = 'HOME',
  CAMERA = 'CAMERA',
  RESULT = 'RESULT',
  PROFILE = 'PROFILE',
  HISTORY = 'HISTORY',
  CALENDAR = 'CALENDAR'
}

export interface FoodRecognition {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  breakdown: Array<{
    item: string;
    calories: number;
  }>;
  imageUrl?: string;
  timestamp: Date;
}

export interface UserStats {
  targetCalories: number;
  consumedCalories: number;
  burnedCalories: number;
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
}
