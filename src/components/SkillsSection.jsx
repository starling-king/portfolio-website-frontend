import React from "react";

function SkillsSection({ skillsArray }) {
  // STRICT RULE: Business logic left 100% untouched.
  if (!skillsArray || skillsArray.length === 0) {
    return null;
  }

  return (
    // PSYCH-UI Fix: Slashed vertical padding (py-10 sm:py-16) to eliminate the dead zone gap
    <section className="relative px-4 py-10 sm:py-16 mx-auto max-w-5xl transition-colors duration-300">
      
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
            // PSYCH-UI Fix: Applied dynamic primary shadow and 3D physics (scale + translate)
            className="px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-bold tracking-wide rounded-2xl text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_15px_rgb(0,0,0,0.03)] dark:shadow-none transform-gpu hover:scale-105 hover:-translate-y-1 hover:shadow-[0_15px_25px_-10px_var(--theme-primary-glow)] hover:border-primary-300 dark:hover:border-primary-500/50 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-300 ease-out cursor-default"
          >
            {skill}
          </div>
        ))}
      </div>
      
    </section>
  );
}

export default SkillsSection;