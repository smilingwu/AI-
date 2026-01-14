
import React, { useState, useEffect } from 'react';
import { Screen, FoodRecognition, UserStats } from './types';
import { INITIAL_USER_STATS, MOCK_HISTORY } from './constants';
import Splash from './screens/Splash';
import Home from './screens/Home';
import CameraScreen from './screens/CameraScreen';
import Result from './screens/Result';
import Profile from './screens/Profile';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.SPLASH);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [history, setHistory] = useState<FoodRecognition[]>(MOCK_HISTORY);
  const [currentRecognition, setCurrentRecognition] = useState<FoodRecognition | null>(null);

  useEffect(() => {
    if (screen === Screen.SPLASH) {
      const timer = setTimeout(() => {
        setScreen(Screen.HOME);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleRecognition = (result: FoodRecognition) => {
    setCurrentRecognition(result);
    setScreen(Screen.RESULT);
  };

  const handleSaveToDiary = () => {
    if (currentRecognition) {
      setHistory([currentRecognition, ...history]);
      setUserStats(prev => ({
        ...prev,
        consumedCalories: prev.consumedCalories + currentRecognition.calories,
        protein: { ...prev.protein, current: prev.protein.current + currentRecognition.protein },
        carbs: { ...prev.carbs, current: prev.carbs.current + currentRecognition.carbs },
        fat: { ...prev.fat, current: prev.fat.current + currentRecognition.fat },
      }));
      setScreen(Screen.HOME);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case Screen.SPLASH:
        return <Splash />;
      case Screen.HOME:
        return <Home stats={userStats} history={history} onScan={() => setScreen(Screen.CAMERA)} setScreen={setScreen} />;
      case Screen.CAMERA:
        return <CameraScreen onBack={() => setScreen(Screen.HOME)} onRecognized={handleRecognition} />;
      case Screen.RESULT:
        return currentRecognition ? (
          <Result 
            recognition={currentRecognition} 
            onBack={() => setScreen(Screen.CAMERA)} 
            onSave={handleSaveToDiary} 
            setScreen={setScreen}
          />
        ) : null;
      case Screen.PROFILE:
      case Screen.CALENDAR:
      case Screen.HISTORY:
        return <Profile onBack={() => setScreen(Screen.HOME)} currentScreen={screen} setScreen={setScreen} />;
      default:
        return <Home stats={userStats} history={history} onScan={() => setScreen(Screen.CAMERA)} setScreen={setScreen} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark relative shadow-2xl">
      {renderScreen()}
      {screen !== Screen.SPLASH && screen !== Screen.CAMERA && (
        <Navbar currentScreen={screen} setScreen={setScreen} />
      )}
      
      {/* Floating Action Button (Camera) */}
      {screen === Screen.HOME && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
          <div className="bg-background-light/60 dark:bg-background-dark/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/40 dark:border-white/10 shadow-lg mb-2 text-[10px] font-bold text-[#6f8961] dark:text-primary uppercase tracking-widest">
            拍摄你的食物
          </div>
          <button 
            onClick={() => setScreen(Screen.CAMERA)}
            className="size-20 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_12px_24px_-8px_rgba(91,236,19,0.5)] border-4 border-white dark:border-background-dark active:scale-95 transition-transform duration-200"
          >
            <span className="material-symbols-outlined !text-4xl">photo_camera</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
