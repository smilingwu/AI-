
import React from 'react';
import { UserStats, FoodRecognition } from './types';

export const INITIAL_USER_STATS: UserStats = {
  targetCalories: 2000,
  consumedCalories: 760,
  burnedCalories: 320,
  protein: { current: 45, target: 120 },
  carbs: { current: 150, target: 250 },
  fat: { current: 32, target: 65 },
};

export const MOCK_HISTORY: FoodRecognition[] = [
  {
    name: "牛油果吐司加蛋",
    calories: 420,
    protein: 25,
    carbs: 45,
    fat: 18,
    timestamp: new Date(),
    breakdown: [
      { item: "全麦吐司", calories: 120 },
      { item: "牛油果", calories: 230 },
      { item: "煎蛋", calories: 70 }
    ],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2cW6NART6At34Gz9bTHcrrUR25HNEfpUOQ-UnoBtOf-8cWlwi1-6uCrzz2yOTl7J-nl9BFcdBm0gjkQ6yCanVXn24B9kfnNM2yt-1HRQa8uVFgNnn05rT-d8dBCjYBFtbLAsEd0-WYycBrMjNkk-vO9KxPFimXQhIKPcdEpnxaRdlgplCO-biVwLkSZ6FV6zVgwY1a9YW69lzql8oh2JPu4o4tf52iRMmYpzl32CJt8mppmhdRD9IDlLUcFPnBCww9YSEBpdZSJEP"
  },
  {
    name: "莓果希腊酸奶",
    calories: 240,
    protein: 15,
    carbs: 30,
    fat: 6,
    timestamp: new Date(Date.now() - 3600000),
    breakdown: [
      { item: "希腊酸奶", calories: 150 },
      { item: "混合莓果", calories: 60 },
      { item: "蜂蜜", calories: 30 }
    ],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9QTiBHaB7hKD_F9oZZk8-UGmCGDHQy5nZ2Abwcgd4NZamQBaE4KItUv7xhHvAStPbXtK_Follp1cxoa59UG22C_XXsetueNuUjGc5SFoSs2eAu1nX58aIzYCG04vHCqtRzQL7dbqnLdfj8u5cGN_yxqy9TVOVxv3fvNOgsD98UxXqykNuod4_o5KO7ZG4WzAcKBXv55_0_GEojzelNEZ_f706TgrjtPzSENkxR_X3HcJLCOeMdfjoVgwlX4cpYT16yBvKl499xbEA"
  }
];
