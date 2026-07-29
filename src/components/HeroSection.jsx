import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "./index.js"

function HeroSection({ name, role, aboutText, profilePhoto, username }) {
  const navigate = useNavigate();

  const initial = (name || username || "A").charAt(0).toUpperCase();


// return (
//     // PSYCH-UI Fix: Tightened min-h and padding to pull the CTA button above the fold (Fitts's Law)
//     <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 py-12 sm:py-16 text-center overflow-hidden transition-colors duration-300">
      
//       {/* 1. Architectural Grid Background */}
//       <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

//       {/* 2. Magnetic Avatar */}
//       <div className="relative z-10 group mb-6 sm:mb-8 gpu-layer">
//         {/* High-Tech Ring */}
//         <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
        
//         {/* Avatar Image - PSYCH-UI Fix: Added dark:border-slate-800 and a resting emerald shadow to bridge the photo's light background */}
//         <div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden border-4 border-white dark:border-slate-800/80 rounded-full shadow-xl dark:shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-slate-100 dark:bg-slate-900 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
//           {profilePhoto ? (
//             <img
//               src={profilePhoto}
//               alt={name || username}
//               className="object-cover w-full h-full"
//             />
//           ) : (
//             <div className="flex items-center justify-center w-full h-full text-5xl sm:text-6xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10">
//               {initial}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 3. Typography Hierarchy */}
//       <div className="relative z-10 max-w-3xl mx-auto space-y-3 sm:space-y-4">
//         <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-slate-50">
//           Hi, I'm{" "}
//           <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
//             {name || username || "Ayush Mishra"}
//           </span>
//         </h1>
        
//         <h2 className="text-lg sm:text-xl font-bold lg:text-2xl text-slate-700 dark:text-slate-300 tracking-wide">
//           {role || "Software Developer"}
//         </h2>
        
//         <p className="max-w-xl mx-auto mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
//           {aboutText || "Building scalable digital solutions."}
//         </p>
//       </div>

//       {/* 4. Action Area */}
//       <div className="relative z-10 mt-8 sm:mt-10 w-full sm:w-auto">
//         <Button
//           onClick={() => navigate(username ? `/${username}/projects` : "/projects")}
//           size="lg"
//           variant="primary"
//           className="w-full sm:w-auto shadow-emerald-500/20"
//         >
//           View Projects
//         </Button>
//       </div>

//     </section>
//   );

// return (
//     // PSYCH-UI: Dynamic Golden Ratio Grid (7:5) with Parallax Depth
//     <section className="relative flex items-center min-h-[80vh] px-4 py-16 sm:py-24 overflow-hidden transition-colors duration-300">
      
//       {/* 1. Architectural Grid Background */}
//       <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

//       {/* Main Content Grid - 12 Columns for Asymmetrical Balance */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
//         {/* LEFT COLUMN (7 Cols): Narrative & Actions (Loads FIRST on mobile) */}
//         <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
          
//           {/* Narrative Hook */}
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 shadow-sm gpu-layer cursor-default">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//             </span>
//             <span className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
//               System Online
//             </span>
//           </div>

//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50 leading-[1.1]">
//             Hi, I'm <br className="hidden sm:block lg:hidden" />
//             <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
//               {name || username || "Ayush Mishra"}
//             </span>
//           </h1>
          
//           <h2 className="mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700 dark:text-slate-300 tracking-wide lg:border-l-4 lg:border-emerald-500 lg:pl-4">
//             {role || "Software Developer"}
//           </h2>
          
//           <p className="max-w-xl mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400">
//             {aboutText || "Building scalable digital solutions and high-performance interfaces."}
//           </p>
          
//           {/* Action Area */}
//           <div className="mt-10 w-full sm:w-auto flex flex-col sm:flex-row gap-4">
//             <Button
//               onClick={() => navigate(username ? `/${username}/projects` : "/projects")}
//               size="lg"
//               variant="primary"
//               className="w-full sm:w-auto shadow-emerald-500/20 group"
//             >
//               <span>View Projects</span>
//               <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </Button>
//           </div>
//         </div>

//         {/* RIGHT COLUMN (5 Cols): Tactical ID Badge (Loads SECOND on mobile) */}
//         <div className="lg:col-span-5 relative w-full max-w-70 sm:max-w-80 mx-auto lg:ml-auto lg:mr-0 order-2 gpu-layer group mt-8 lg:mt-0">
          
//           {/* Depth Illusion: Floating Glow */}
//           <div className="absolute -inset-6 bg-linear-to-tr from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 blur-3xl rounded-[3rem] -z-10 transition-all duration-700 group-hover:scale-110 opacity-70" />
          
//           {/* The Physical Badge Card */}
//           <div className="relative p-2 rounded-4xl bg-white/60 dark:bg-[#040405]/60 backdrop-blur-2xl border border-white/80 dark:border-slate-800/80 shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-1">
            
//             {/* Aspect Ratio 4:5 (Professional Portrait) */}
//             <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800/50">
//               {profilePhoto ? (
//                 <img
//                   src={profilePhoto}
//                   alt={name || username}
//                   className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                 />
//               ) : (
//                <div className="flex items-center justify-center w-full h-full text-7xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10">
//                   {initial}
//                 </div>
//               )}

//               {/* HUD Elements: Sniper Corners */}
//               <div className="absolute inset-0 border border-emerald-500/10 rounded-3xl pointer-events-none" />
//               <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/60 rounded-tl-sm pointer-events-none" />
//               <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/60 rounded-br-sm pointer-events-none" />
//             </div>
            
//             {/* Floating Data Module overlaying the bottom right */}
//             <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-2 gpu-layer transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
//                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                </svg>
//                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-widest pr-1 uppercase">
//                  Verified
//                </span>
//             </div>
            
//           </div>
//         </div>

//       </div>
//     </section>
//   );

return (
    <section className="relative flex items-center min-h-[75vh] sm:min-h-[85vh] px-4 py-16 sm:py-24 overflow-hidden transition-colors duration-300">
      
      {/* 1. Architectural Grid Background */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      {/* Main Content Grid - 12 Columns for Asymmetrical Balance */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT COLUMN (7 Cols): Narrative & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
          
          {/* Narrative Hook */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
              System Online
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50 leading-[1.1]">
            Hi, I'm <br className="hidden sm:block lg:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
              {name || username || "Ayush Mishra"}
            </span>
          </h1>
          
          <h2 className="mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700 dark:text-slate-300 tracking-wide lg:border-l-4 lg:border-emerald-500 lg:pl-4">
            {role || "Software Developer"}
          </h2>
          
          <p className="max-w-xl mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            {aboutText || "Building scalable digital solutions and high-performance interfaces."}
          </p>
          
          {/* Action Area */}
          <div className="mt-10 w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate(username ? `/${username}/projects` : "/projects")}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto shadow-emerald-500/20 group"
            >
              <span>View Projects</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Tactical ID Badge */}
        <div className="lg:col-span-5 relative w-full max-w-70 sm:max-w-80 mx-auto lg:ml-auto lg:mr-0 order-2 gpu-layer group mt-8 lg:mt-0">
          
          {/* Depth Illusion: Floating Glow */}
          <div className="absolute -inset-6 bg-linear-to-tr from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 blur-3xl rounded-[3rem] -z-10 transition-all duration-700 group-hover:scale-110 opacity-70" />
          
          {/* The Physical Badge Card - PSYCH-UI Fix: Hardened Light Mode Border (border-slate-200) for Figure-Ground Segregation */}
          <div className="relative p-2 rounded-4xl bg-white/80 dark:bg-[#040405]/60 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-1">
            
            {/* Aspect Ratio 4:5 */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800/50">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name || username}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
               <div className="flex items-center justify-center w-full h-full text-7xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10">
                  {initial}
                </div>
              )}

              {/* HUD Elements */}
              <div className="absolute inset-0 border border-emerald-500/10 rounded-3xl pointer-events-none" />
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/60 rounded-tl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/60 rounded-br-sm pointer-events-none" />
            </div>
            
            {/* Floating Data Module */}
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-2 gpu-layer transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
               <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-widest pr-1 uppercase">
                 Verified
               </span>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );

}

export default HeroSection;
