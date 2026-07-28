import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "./index.js"

function HeroSection({ name, role, aboutText, profilePhoto, username }) {
  const navigate = useNavigate();

  const initial = (name || username || "A").charAt(0).toUpperCase();

  // return (
  //   <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
  //     <div className="w-32 h-32 mb-8 overflow-hidden border-4 border-white rounded-full shadow-lg bg-slate-200">
  //       {profilePhoto ? (
  //         <img
  //           src={profilePhoto}
  //           alt={name}
  //           className="object-cover w-full h-full"
  //         />
  //       ) : (
  //         <div className="flex items-center justify-center w-full h-full text-5xl font-bold text-indigo-600 bg-indigo-100">
  //           {initial}
  //         </div>
  //       )}
  //     </div>

  //     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
  //       Hi, I'm {name || username}
  //     </h1>
  //     <h2 className="mt-4 text-xl font-semibold text-indigo-600 sm:text-2xl">
  //       {role || "Software Developer"}
  //     </h2>
  //     <p className="max-w-2xl mt-4 text-lg text-slate-600 sm:text-xl">
  //       {aboutText || "Building scalable digital solutions."}
  //     </p>
  //     <div className="flex gap-4 mt-8">
  //       <button
  //         onClick={() =>
  //           navigate(username ? `/${username}/projects` : "/projects")
  //         }
  //         className="px-6 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
  //       >
  //         View Projects
  //       </button>
  //     </div>
  //   </section>
  // );

return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 text-center overflow-visible transition-colors duration-300">
      
      {/* 1. Ambient Background Glow (Using canonical Tailwind v4 sizes: 72 = 288px, 112 = 448px) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-md sm:h-md bg-indigo-500/30 dark:bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

      {/* 2. Magnetic Avatar */}
      <div className="relative group mb-10 gpu-layer">
        {/* Glow Ring (Updated to bg-linear-to-tr) */}
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500 to-violet-500 blur-xl opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500 ease-out" />
        
        {/* Avatar Image */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 overflow-hidden border-4 border-slate-50 dark:border-slate-950 rounded-full shadow-2xl bg-slate-100 dark:bg-slate-900 transition-transform duration-500 ease-out group-hover:scale-105">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={name || username}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-5xl sm:text-6xl font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10">
              {initial}
            </div>
          )}
        </div>
      </div>

      {/* 3. Gradient Typography */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl text-slate-900 dark:text-slate-50">
          Hi, I'm{" "}
          {/* Updated to bg-linear-to-r */}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-500 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            {name || username}
          </span>
        </h1>
        
        <h2 className="mt-6 text-xl font-bold sm:text-3xl text-slate-700 dark:text-slate-300">
          {role || "Software Developer"}
        </h2>
        
        <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
          {aboutText || "Building scalable digital solutions."}
        </p>
      </div>

      {/* 4. Action Area (Using your custom core <Button> component) */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
        <Button
          onClick={() => navigate(username ? `/${username}/projects` : "/projects")}
          size="lg"
          variant="primary"
          className="w-full sm:w-auto shadow-indigo-500/25 dark:shadow-indigo-500/15"
        >
          View Projects
        </Button>
      </div>

    </section>
  );
}

export default HeroSection;
