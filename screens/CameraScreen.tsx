
import React, { useRef, useState, useEffect } from 'react';
import { recognizeFood } from '../services/geminiService';
import { FoodRecognition } from '../types';

interface CameraScreenProps {
  onBack: () => void;
  onRecognized: (result: FoodRecognition) => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onBack, onRecognized }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("无法访问相机，请检查权限。");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureAndRecognize = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setLoading(true);
    setError(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');

    try {
      const result = await recognizeFood(dataUrl);
      onRecognized({
        ...result,
        imageUrl: dataUrl,
        timestamp: new Date()
      });
    } catch (err) {
      setError("AI 识别失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col h-screen overflow-hidden">
      <div className="relative flex-1">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Overlay UI */}
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
          {/* Top Bar */}
          <div className="flex items-center p-4 justify-between pointer-events-auto">
            <button 
              onClick={onBack}
              className="text-white flex size-12 items-center justify-center bg-black/20 rounded-full backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <div className="flex flex-col items-center">
              <h2 className="text-white text-lg font-bold drop-shadow-md">AI 相机识别</h2>
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full mt-1 border border-white/10">
                <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-white text-[10px] font-semibold uppercase tracking-widest">实时检测</span>
              </div>
            </div>
            <div className="w-12"></div>
          </div>

          {/* Viewfinder */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative w-72 h-72">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-xl"></div>
              <div className="absolute top-1/4 left-2 right-2 h-1 scan-line opacity-60 animate-bounce"></div>
              
              {!loading && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-background-dark font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">restaurant</span>
                  <span>对准食物</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 pb-6">
            <p className="text-white text-base font-medium drop-shadow-lg text-center">
              {loading ? "正在通过 AI 分析食物..." : "点击下方按钮捕捉美食"}
            </p>
          </div>

          {/* Bottom Controls */}
          <div className="bg-gradient-to-t from-black/80 to-transparent pt-10 pb-12 px-8 pointer-events-auto">
            <div className="flex items-center justify-between gap-6 max-w-sm mx-auto">
              <button className="flex shrink-0 items-center justify-center rounded-xl size-14 bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                <span className="material-symbols-outlined text-2xl">image</span>
              </button>
              
              <button 
                onClick={captureAndRecognize}
                disabled={loading}
                className={`relative flex shrink-0 items-center justify-center rounded-full size-24 border-4 border-accent-yellow p-1 shadow-2xl transition-transform active:scale-95 ${loading ? 'opacity-50' : ''}`}
              >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shutter-glow">
                  {loading ? (
                    <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      fit_screen
                    </span>
                  )}
                </div>
              </button>
              
              <button className="flex shrink-0 items-center justify-center rounded-xl size-14 bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                <span className="material-symbols-outlined text-2xl">flash_on</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="absolute top-24 left-4 right-4 bg-red-500 text-white p-3 rounded-xl text-center z-20">
          {error}
        </div>
      )}
    </div>
  );
};

export default CameraScreen;
