import React from "react";

function SkillsSection({ skillsArray }) {
  if (!skillsArray || skillsArray.length === 0) {
    return null;
  }

  // return (
  //   <section className="py-16 bg-white">
  //     <div className="max-w-4xl px-4 mx-auto text-center">
  //       <h2 className="text-3xl font-bold text-slate-900">Technical Arsenal</h2>
  //       <div className="flex flex-wrap justify-center gap-3 mt-8">
  //         {skillsArray.map((skill, index) => (
  //           <div
  //             key={index}
  //             className="px-4 py-2 text-sm font-medium border rounded-full text-slate-700 border-slate-200 bg-slate-50"
  //           >
  //             {skill}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    // PSYCH-UI Fix: Removed bg-white to allow global seamless flow. 
    // Constrained width to max-w-5xl for tighter reading rhythm (F-Pattern).
    <section className="relative px-4 py-16 sm:py-24 mx-auto max-w-5xl transition-colors duration-300">
      
      {/* 1. Cognitive Anchoring: HUD Marker Header */}
      <div className="flex flex-col items-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm gpu-layer cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          <span className="text-[10px] font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
            Expertise
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight text-center">
          Technical Arsenal
        </h2>
      </div>

      {/* 2. Tactical Keycap Grid */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {skillsArray.map((skill, index) => (
          <div
            key={index}
            // PSYCH-UI: Glassmorphic squircle (rounded-2xl) with Z-axis lift and Emerald illumination on hover.
            className="px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-bold tracking-wide rounded-2xl text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_15px_rgb(0,0,0,0.03)] dark:shadow-none hover:-translate-y-1.5 hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.15)] hover:border-primary-200 dark:hover:border-primary-500/30 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 transition-all duration-300 ease-out cursor-default gpu-layer"
          >
            {skill}
          </div>
        ))}
      </div>
      
    </section>
  );

}

export default SkillsSection;
