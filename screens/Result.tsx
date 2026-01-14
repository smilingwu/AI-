
import React from 'react';
import { FoodRecognition, Screen } from '../types';

interface ResultProps {
  recognition: FoodRecognition;
  onBack: () => void;
  onSave: () => void;
  setScreen: (screen: Screen) => void;
}

const Result: React.FC<ResultProps> = ({ recognition, onBack, onSave, setScreen }) => {
  const totalMacros = recognition.protein + recognition.carbs + recognition.fat;
  const pPerc = Math.round((recognition.protein / totalMacros) * 100);
  const cPerc = Math.round((recognition.carbs / totalMacros) * 100);
  const fPerc = 100 - pPerc - cPerc;

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-y-auto pb-48">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button 
          onClick={onBack}
          className="text-[#131811] dark:text-white flex size-12 items-center"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-[#131811] dark:text-white text-lg font-bold leading-tight flex-1 text-center pr-12">识别结果</h2>
      </div>

      <div className="px-4 py-3">
        <div 
          className="w-full h-80 bg-center bg-no-repeat bg-cover rounded-xl shadow-sm border border-black/5" 
          style={{ backgroundImage: `url("${recognition.imageUrl || 'https://picsum.photos/seed/foodresult/400'}")` }}
        />
      </div>

      <div className="px-4 text-center">
        <h1 className="text-[#131811] dark:text-white tracking-light text-[42px] font-extrabold leading-tight pt-4">
          {recognition.calories} <span className="text-lg font-bold text-primary">Kcal</span>
        </h1>
        <p className="text-sage dark:text-primary/70 text-sm font-medium pb-6 uppercase tracking-wider">预估总千卡</p>
      </div>

      <div className="mx-4 mb-6 p-6 bg-white dark:bg-zinc-900/50 rounded-xl shadow-sm border border-sage/10">
        <div className="flex flex-col items-center">
          <p className="text-[#131811] dark:text-white text-lg font-bold mb-6 self-start">营养成分分析</p>
          <div className="flex items-center gap-10 w-full justify-around">
            {/* Donut Chart Mock with Conic Gradient */}
            <div 
              className="size-32 rounded-full relative flex items-center justify-center"
              style={{
                background: `conic-gradient(#5bec13 0% ${pPerc}%, #f2e3a1 ${pPerc}% ${pPerc+cPerc}%, #6f8961 ${pPerc+cPerc}% 100%)`
              }}
            >
              <div className="size-20 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-sage/40 dark:text-white/20 text-3xl">restaurant</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div>
                  <p className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">蛋白质</p>
                  <p className="text-[#131811] dark:text-white font-bold text-sm">
                    {recognition.protein}g <span className="text-[10px] font-normal opacity-60">({pPerc}%)</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f2e3a1]"></div>
                <div>
                  <p className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">碳水</p>
                  <p className="text-[#131811] dark:text-white font-bold text-sm">
                    {recognition.carbs}g <span className="text-[10px] font-normal opacity-60">({cPerc}%)</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sage"></div>
                <div>
                  <p className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">脂肪</p>
                  <p className="text-[#131811] dark:text-white font-bold text-sm">
                    {recognition.fat}g <span className="text-[10px] font-normal opacity-60">({fPerc}%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3 pb-4">
        <p className="text-[#131811] dark:text-white font-bold mb-2">详细组成</p>
        {recognition.breakdown.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-zinc-900/50 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sage">check_circle</span>
              <span className="text-[#131811] dark:text-white font-medium">{item.item}</span>
            </div>
            <span className="text-gray-400 text-sm font-bold">{item.calories} Kcal</span>
          </div>
        ))}
      </div>

      {/* Persistent Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 border-t border-gray-200 dark:border-zinc-800 flex flex-col gap-3 z-50">
        <button 
          onClick={onSave}
          className="w-full bg-primary hover:bg-opacity-90 text-background-dark font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">save</span>
          保存到日记
        </button>
        <button 
          onClick={() => setScreen(Screen.CAMERA)}
          className="w-full bg-sage/10 dark:bg-white/5 text-sage dark:text-primary font-bold py-4 rounded-xl transition-all border border-sage/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">edit</span>
          重新拍摄
        </button>
      </div>
    </div>
  );
};

export default Result;
