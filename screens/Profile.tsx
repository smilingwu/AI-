
import React from 'react';
import { Screen } from '../types';

interface ProfileProps {
  onBack: () => void;
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack, currentScreen, setScreen }) => {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const calendarDays = [
    { day: 1, status: 'reached' },
    { day: 2, status: 'reached' },
    { day: 3, status: 'over' },
    { day: 4, status: 'reached' },
    { day: 5, status: 'current' },
    { day: 6, status: 'over' },
    { day: 7, status: 'reached' },
    { day: 8, status: 'reached' },
    { day: 9, status: 'reached' },
    { day: 10, status: 'none' },
    { day: 11, status: 'none' },
    { day: 12, status: 'none' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#0d1409] overflow-y-auto pb-32">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-white/80 dark:bg-[#0d1409]/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="flex size-12 items-center justify-center">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">个人中心</h2>
        <div className="w-12 flex justify-end">
          <button className="flex size-10 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>

      <div className="flex p-6 flex-col items-center gap-4">
        <div className="relative">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 ring-4 ring-sage/20" 
            style={{ backgroundImage: 'url("https://picsum.photos/seed/profile/300/300")' }}
          />
          <div className="absolute bottom-1 right-1 bg-sage text-white rounded-full p-1.5 border-2 border-white dark:border-[#0d1409]">
            <span className="material-symbols-outlined text-sm">edit</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[22px] font-bold leading-tight">艾琳娜</p>
          <p className="text-sage dark:text-primary/80 text-base font-medium">热量管理达人</p>
          <div className="mt-2 flex items-center gap-1.5 bg-sage/10 dark:bg-primary/20 px-3 py-1 rounded-full">
            <span className="text-sage dark:text-primary material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <p className="text-sage dark:text-primary text-sm font-bold">连续坚持 12 天</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="h-[1px] bg-gray-100 dark:bg-gray-800 w-full"></div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between pt-4 pb-4">
          <h3 className="text-lg font-bold">打卡日历</h3>
          <p className="text-sage dark:text-primary text-sm font-medium">2024年10月</p>
        </div>
        
        <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          {weekDays.map(d => <div key={d} className="h-8 flex items-center justify-center">{d}</div>)}
          
          {/* Calendar placeholder padding */}
          <div className="h-12"></div><div className="h-12"></div>
          
          {calendarDays.map((d, idx) => (
            <div key={idx} className="h-12 flex flex-col items-center justify-center relative">
              {d.status === 'current' && <div className="absolute inset-1 bg-sage/20 rounded-lg -z-0"></div>}
              <span className={`text-sm font-bold ${d.status === 'current' ? 'text-sage' : ''} ${d.status === 'none' ? 'text-gray-300' : ''}`}>
                {d.day}
              </span>
              {d.status !== 'none' && (
                <div className={`size-1.5 rounded-full mt-1 ${d.status === 'reached' || d.status === 'current' ? 'bg-primary' : 'bg-yellow-400'}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 py-4 flex-wrap">
          <div className="flex h-8 items-center gap-x-2 rounded-lg bg-gray-50 dark:bg-white/5 px-3 border border-gray-100 dark:border-white/10">
            <div className="size-2 bg-primary rounded-full"></div>
            <p className="text-xs font-semibold">目标达成</p>
          </div>
          <div className="flex h-8 items-center gap-x-2 rounded-lg bg-gray-50 dark:bg-white/5 px-3 border border-gray-100 dark:border-white/10">
            <div className="size-2 bg-yellow-400 rounded-full"></div>
            <p className="text-xs font-semibold">超出上限</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12">
        <h3 className="text-lg font-bold pb-4 pt-6">本周进度</h3>
        <div className="bg-sage/5 dark:bg-white/5 border border-sage/20 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sage text-sm font-medium uppercase tracking-wide">平均摄入</p>
              <p className="text-2xl font-extrabold">1,840 <span className="text-sm font-bold text-gray-500">千卡/天</span></p>
            </div>
            <div className="size-12 rounded-full bg-sage/20 flex items-center justify-center text-sage">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { label: '一', val: 85, color: 'bg-primary' },
              { label: '二', val: 92, color: 'bg-primary' },
              { label: '三', val: 100, color: 'bg-yellow-400' },
              { label: '四', val: 78, color: 'bg-primary' }
            ].map((day, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-xs font-bold w-4 text-gray-500 text-center">{day.label}</p>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${day.color}`} style={{ width: `${day.val}%` }}></div>
                </div>
                <p className="text-xs font-bold w-8">{day.val}%</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-yellow-100 dark:bg-yellow-400/20 flex items-center justify-center text-yellow-600">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">最佳表现</p>
                <p className="text-sm font-bold">周二</p>
              </div>
            </div>
            <button className="bg-sage text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-opacity-90">
              查看完整报告
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
