
import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, AlertTriangle, ShieldCheck, Maximize2, Minimize2, Activity, Zap } from 'lucide-react';
import { detectUserFocus } from '../geminiService';

const FocusGuardian: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [focusState, setFocusState] = useState<'FOCUSED' | 'DISTRACTED' | 'IDLE'>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setError(null);
        setIsMinimized(true); // Keep it small by default
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access denied.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setFocusState('IDLE');
  };

  useEffect(() => {
    let intervalId: number;

    if (isActive) {
      intervalId = window.setInterval(async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Capture frame - ultra-low resolution for mini analyzer
        canvas.width = 120; 
        canvas.height = 90;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.3);
        const base64 = dataUrl.split(',')[1];

        const state = await detectUserFocus(base64);
        setFocusState(state);
      }, 10000); // Check every 10s for persistent monitoring efficiency
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  return (
    <div className={`fixed bottom-6 right-6 z-[999] transition-all duration-700 transform ${
      isMinimized ? 'w-40' : 'w-72'
    }`}>
      <div className={`bg-black/80 backdrop-blur-2xl border ${
        focusState === 'DISTRACTED' ? 'border-red-500 shadow-red-500/20' : 'border-gray-800 shadow-indigo-500/20'
      } rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500`}>
        
        {/* Compact Header */}
        <div className="px-4 py-2 flex items-center justify-between bg-gray-900/40">
          <div className="flex items-center gap-1.5">
            <Zap className={`w-3 h-3 ${isActive ? 'text-indigo-400' : 'text-gray-600'}`} />
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">MDG</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-gray-600 hover:text-gray-300 transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-2.5 h-2.5" /> : <Minimize2 className="w-2.5 h-2.5" />}
            </button>
            <button 
              onClick={isActive ? stopCamera : startCamera}
              className={`p-1 transition-colors ${
                isActive ? 'text-red-500 hover:bg-red-500/10' : 'text-indigo-400 hover:bg-indigo-400/10'
              }`}
            >
              <Camera className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className={`p-3 transition-all duration-300 ${isMinimized ? 'flex items-center gap-3' : 'space-y-3'}`}>
          {!isMinimized && (
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800/50">
               <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className={`w-full h-full object-cover grayscale opacity-30 ${isActive ? 'block' : 'hidden'}`} 
              />
              <canvas ref={canvasRef} className="hidden" />
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-800">
                  <CameraOff className="w-6 h-6 opacity-20" />
                </div>
              )}
            </div>
          )}

          <div className={`flex flex-col ${isMinimized ? 'flex-1' : 'w-full'}`}>
             <div className="flex items-center gap-2">
               {focusState === 'FOCUSED' ? (
                 <ShieldCheck className="w-3 h-3 text-emerald-500" />
               ) : focusState === 'DISTRACTED' ? (
                 <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
               ) : (
                 <Activity className="w-3 h-3 text-gray-600" />
               )}
               <span className={`text-[10px] font-black uppercase tracking-tighter ${
                 focusState === 'FOCUSED' ? 'text-emerald-500' : focusState === 'DISTRACTED' ? 'text-red-500' : 'text-gray-600'
               }`}>
                 {isActive ? focusState : 'Inactive'}
               </span>
             </div>
             {isMinimized && focusState === 'DISTRACTED' && (
               <span className="text-[8px] text-red-500/50 font-black uppercase mt-0.5 tracking-widest">Alert</span>
             )}
          </div>
        </div>

        {/* Global Alert Notification */}
        {isActive && focusState === 'DISTRACTED' && !isMinimized && (
          <div className="px-3 pb-3">
             <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
               <p className="text-[9px] text-red-200/60 leading-tight font-bold uppercase tracking-wide">
                 Mind drift detected. Synchronizing corrective training...
               </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusGuardian;
