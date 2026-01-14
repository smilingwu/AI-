
import React from 'react';
import { UserStats, FoodRecognition, Screen } from '../types';

interface HomeProps {
  stats: UserStats;
  history: FoodRecognition[];
  onScan: () => void;
  setScreen: (screen: Screen) => void;
}

const Home: React.FC<HomeProps> = ({ stats, history, onScan, setScreen }) => {
  const remaining = stats.targetCalories - stats.consumedCalories + stats.burnedCalories;
  const progress = (stats.consumedCalories / stats.targetCalories) * 100;
  
  // Ring chart calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className="pb-32 px-4 space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 py-2">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setScreen(Screen.PROFILE)}
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30 cursor-pointer" 
            style={{ backgroundImage: 'url("https://picsum.photos/seed/user/100/100")' }}
          />
          <div>
            <p className="text-xs text-[#6f8961] dark:text-primary/70 font-medium">10月24日 星期二</p>
            <h2 className="text-[#131811] dark:text-white text-lg font-bold leading-tight">早上好，Alex</h2>
          </div>
        </div>
        <button className="p-2 rounded-xl bg-white dark:bg-white/10 shadow-sm border border-black/5">
          <span className="material-symbols-outlined text-[#131811] dark:text-white">settings</span>
        </button>
      </div>

      {/* Calorie Card */}
      <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-black/5 flex flex-col items-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-40 bg-primary/5 rounded-full blur-3xl"></div>
        <p className="text-[#6f8961] dark:text-primary/70 text-sm font-semibold uppercase tracking-wider mb-6">剩余热量</p>
        
        <div className="relative size-56 flex items-center justify-center">
          <svg className="ring-chart size-full" viewBox="0 0 100 100">
            <circle className="text-[#fefce8] dark:text-white/5" cx="50" cy="50" fill="transparent" r={radius} stroke="currentColor" strokeWidth="8"></circle>
            <circle 
              className="text-primary" 
              cx="50" cy="50" fill="transparent" r={radius} 
              stroke="currentColor" strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold text-[#131811] dark:text-white tracking-tight">
              {remaining.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-[#6f8961] dark:text-primary/70">千卡 剩余</span>
          </div>
        </div>

        <div className="flex gap-8 mt-6">
          <div className="text-center">
            <p className="text-xs text-[#6f8961] dark:text-primary/70 font-medium">已摄入</p>
            <p className="text-lg font-bold">{stats.consumedCalories}</p>
          </div>
          <div className="w-[1px] bg-black/5 dark:bg-white/10 h-10"></div>
          <div className="text-center">
            <p className="text-xs text-[#6f8961] dark:text-primary/70 font-medium">已消耗</p>
            <p className="text-lg font-bold">{stats.burnedCalories}</p>
          </div>
        </div>
      </div>

      {/* Nutrients */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[#131811] dark:text-white text-lg font-bold tracking-tight">每日营养素</h3>
          <button className="text-primary text-sm font-bold">详情</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '蛋白质', val: stats.protein },
            { label: '碳水', val: stats.carbs },
            { label: '脂肪', val: stats.fat }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl p-4 bg-white dark:bg-white/5 border border-black/5 shadow-sm">
              <p className="text-[#6f8961] dark:text-primary/70 text-xs font-bold uppercase">{item.label}</p>
              <p className="text-[#131811] dark:text-white text-[11px] font-bold">
                {item.val.current}/{item.val.target}g
              </p>
              <div className="h-1.5 w-full bg-[#fefce8] dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${(item.val.current / item.val.target) * 100}%` }}
                ></div>
              </div>
              <p className="text-primary text-[10px] font-bold">{Math.round((item.val.current / item.val.target) * 100)}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[#131811] dark:text-white text-lg font-bold tracking-tight">最近识别</h3>
          <button className="text-[#6f8961] dark:text-primary/70 text-sm font-medium">历史</button>
        </div>
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white dark:bg-white/5 p-3 rounded-xl border border-black/5 shadow-sm">
              <div 
                className="size-14 rounded-lg bg-center bg-cover border border-black/5 flex-shrink-0" 
                style={{ backgroundImage: `url("${item.imageUrl || 'https://picsum.photos/seed/food/200'}")` }}
              />
              <div className="flex-1">
                <h4 className="font-bold text-[#131811] dark:text-white text-sm truncate">{item.name}</h4>
                <p className="text-xs text-[#6f8961] dark:text-primary/70">
                  {item.timestamp.getHours()}:{item.timestamp.getMinutes().toString().padStart(2, '0')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{item.calories} 千卡</p>
                <p className="text-[10px] text-primary font-bold">健康饮食</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
