
import React from 'react';
import { Screen } from '../types';

interface NavbarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentScreen, setScreen }) => {
  const tabs = [
    { id: Screen.HOME, label: '首页', icon: 'home' },
    { id: Screen.HISTORY, label: '历史', icon: 'history' },
    { id: 'spacer', label: '', icon: '' },
    { id: Screen.CALENDAR, label: '日历', icon: 'calendar_today' },
    { id: Screen.PROFILE, label: '我的', icon: 'person' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5 px-6 pt-2 pb-6 flex justify-between items-center z-40">
      {tabs.map((tab, idx) => {
        if (tab.id === 'spacer') return <div key={idx} className="w-16" />;
        
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id as Screen)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-[#6f8961] dark:text-white/40'
            }`}
          >
            <span className={`material-symbols-outlined !text-2xl ${isActive ? 'fill-1' : ''}`}>
              {tab.icon}
            </span>
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;
