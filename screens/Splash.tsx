
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-between p-8 bg-mesh dark:bg-none dark:bg-background-dark">
      <div className="h-12 w-full"></div>
      
      <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-1000">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-0 bg-sage/10 dark:bg-primary/20 rounded-full blur-2xl"></div>
          <div className="relative flex h-24 w-24 items-center justify-center bg-cream dark:bg-sage/20 rounded-2xl shadow-sm border border-sage/10">
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-sage dark:text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                eco
              </span>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-background-dark p-1.5 rounded-full border border-sage/20 shadow-sm">
                <span className="material-symbols-outlined text-sage dark:text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                  restaurant
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[#131811] dark:text-white text-4xl font-black tracking-tight flex items-center">
            AI<span className="text-sage dark:text-primary ml-1">食刻</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-sage/20"></div>
            <span className="text-sm tracking-[0.3em] text-sage/60 dark:text-primary/60 font-medium">健康每一餐</span>
            <div className="h-[1px] w-6 bg-sage/20"></div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-12 pb-16">
        <h3 className="text-[#131811] dark:text-gray-200 tracking-[0.05em] text-2xl font-semibold px-4 text-center">
          智慧饮食，轻盈生活
        </h3>
        <div className="w-full max-w-[220px] flex flex-col gap-4">
          <div className="h-1.5 w-full rounded-full bg-sage/10 dark:bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-sage dark:bg-primary w-1/3 shadow-[0_0_10px_rgba(120,148,97,0.2)] animate-pulse"></div>
          </div>
          <p className="text-center text-xs text-sage/50 dark:text-gray-500 font-medium tracking-widest">
            AI 正在开启
          </p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
