import React, { useState, useEffect } from "react";

export default function ServerWakeupBanner() {
  const [isWaking, setIsWaking] = useState(false);

  useEffect(() => {
    const handleWaking = () => setIsWaking(true);
    const handleAwake = () => setIsWaking(false);

    window.addEventListener("server-waking", handleWaking);
    window.addEventListener("server-awake", handleAwake);

    return () => {
      window.removeEventListener("server-waking", handleWaking);
      window.removeEventListener("server-awake", handleAwake);
    };
  }, []);

  if (!isWaking) return null;

  // return (
  //   <div className="w-full bg-indigo-50 border-b border-indigo-100 px-4 py-3 text-indigo-800 flex items-center justify-center text-sm font-medium shadow-inner">
  //     <svg
  //       className="animate-spin -ml-1 mr-3 h-4 w-4 text-indigo-600"
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //     >
  //       <circle
  //         className="opacity-25"
  //         cx="12"
  //         cy="12"
  //         r="10"
  //         stroke="currentColor"
  //         strokeWidth="4"
  //       ></circle>
  //       <path
  //         className="opacity-75"
  //         fill="currentColor"
  //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //       ></path>
  //     </svg>
  //     <span>
  //       Our server spins down after 15 minutes of inactivity. Please wait a
  //       moment while it wakes up...
  //     </span>
  //   </div>
  // );

  return (
    // PSYCH-UI: Fixed floating HUD. Detached from document flow to prevent layout shifts.
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 w-[calc(100%-2rem)] max-w-sm gpu-layer">
      
      {/* Benthic Glass Shell with Emerald Glow */}
      <div className="relative flex items-center gap-4 p-4 bg-white/90 dark:bg-[#040405]/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden">
        
        {/* Ambient scanning gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/5 dark:via-emerald-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

        {/* Tactical Radar Spinner */}
        <div className="relative flex items-center justify-center w-10 h-10 shrink-0 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
          {/* Outer Ping */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-20 animate-ping"></div>
          {/* Core Spinner */}
          <svg
            className="w-5 h-5 text-emerald-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        {/* Cognitive Reframing text block */}
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-0.5 animate-pulse">
            System Boot Sequence
          </span>
          <span className="text-[12px] font-semibold leading-snug text-slate-600 dark:text-slate-400">
            Waking core backend services from standby mode. Establishing connection...
          </span>
        </div>
        
      </div>
    </div>
  );

}
