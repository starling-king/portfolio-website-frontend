import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({
  title,
  description,
  techStack,
  tech_stack,
  category,
  featuredImage,
  slug,
  username,
}) {

  const normalizedTechStack = techStack || tech_stack || [];
  
  // return (
  //   <Link to={`/${username}/project/${slug}`} className="block h-full group">
  //     <div className="flex flex-col h-full p-4 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-indigo-300">
  //       <div className="w-full mb-4 overflow-hidden bg-slate-100 rounded-lg aspect-video">
  //         {featuredImage ? (
  //           <img
  //             src={featuredImage}
  //             alt={title}
  //             className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
  //           />
  //         ) : (
  //           <div className="flex items-center justify-center w-full h-full text-slate-400">
  //             No Image Provided
  //           </div>
  //         )}
  //       </div>

  //       <div className="flex flex-col grow">
  //         <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
  //           {category || "Uncategorized"}
  //         </span>
  //         <h2 className="mt-2 text-xl font-bold text-slate-800">{title}</h2>
  //         <p className="mt-2 text-sm text-slate-600 line-clamp-3">
  //           {description}
  //         </p>

  //         <div className="flex flex-wrap gap-2 mt-4">
  //           {techStack?.map((tech, index) => (
  //             <span
  //               key={index}
  //               className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md"
  //             >
  //               {tech}
  //             </span>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </Link>
  // );

  // return (
  //   <Link to={`/${username}/project/${slug}`} className="block h-full group outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-4xl gpu-layer">
      
  //     {/* PSYCH-UI: High-Tech Card Shell with GPU hover lift and OLED background */}
  //     <div className="relative flex flex-col h-full bg-white dark:bg-[#040405] border border-slate-200 dark:border-slate-800 rounded-4xl shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden">
        
  //       {/* Image Container */}
  //       <div className="relative w-full aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/50">
          
  //         {/* Tactical HUD Badge for Category */}
  //         <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/80 dark:bg-[#040405]/80 backdrop-blur-md border border-white/50 dark:border-slate-700 text-primary-700 dark:text-primary-400 rounded-lg shadow-sm">
  //           {category || "Uncategorized"}
  //         </div>

  //         {featuredImage ? (
  //           <img
  //             src={featuredImage}
  //             alt={title}
  //             className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
  //           />
  //         ) : (
  //           <div className="flex items-center justify-center w-full h-full text-sm font-semibold tracking-wider text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50 uppercase">
  //             No Image Provided
  //           </div>
  //         )}
          
  //         {/* Subtle bottom gradient to blend image into the card body */}
  //         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  //       </div>

  //       {/* Content Area */}
  //       <div className="flex flex-col grow p-5 sm:p-6">
          
  //         {/* Title with focus-shift psychology */}
  //         <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
  //           {title}
  //         </h2>
          
  //         {/* Description */}
  //         <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
  //           {description}
  //         </p>

  //         {/* Tech Stack - Pushed to bottom using mt-auto */}
  //         <div className="flex flex-wrap gap-2 mt-auto pt-6">
  //           {techStack?.map((tech, index) => (
  //             <span
  //               key={index}
  //               className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg transition-colors duration-300 group-hover:border-primary-200 dark:group-hover:border-primary-500/30"
  //             >
  //               {tech}
  //             </span>
  //           ))}
  //         </div>
          
  //       </div>
  //     </div>
  //   </Link>
  // );

return (
    <Link 
      to={`/${username}/project/${slug}`} 
      className="block h-full group outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-4xl gpu-layer relative"
    >
      {/* Outer wrapper: CSS Spotlight Sheen (Dialed back the green intensity) */}
      <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary-500/0 via-slate-400/0 to-primary-500/0 group-hover:from-primary-500/20 group-hover:via-slate-400/10 group-hover:to-primary-500/20 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[2px]" />
      
      {/* Inner Container: Physical Glass Card */}
      <div className="relative flex flex-col h-full bg-white/70 dark:bg-[#040405]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] overflow-hidden m-px">
        
        {/* Top Section: Image Canvas */}
        <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-900 m-2 rounded-3xl w-[calc(100%-16px)]">
          
          {/* Tactical HUD Badge (Monochrome with tiny primary signal) */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/95 dark:bg-[#040405]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-105 gpu-layer">
            <span className="text-primary-500 mr-1.5 animate-pulse inline-block">•</span>
            {category || "Uncategorized"}
          </div>

          {/* Action Arrow */}
          <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-slate-900 dark:bg-primary-500 text-white rounded-xl shadow-lg opacity-0 -translate-y-4 translate-x-4 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 gpu-layer">
            <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          {featuredImage ? (
            <>
              <img
                src={featuredImage}
                alt={title}
                className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-[1.08] group-hover:-rotate-1"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-500 pointer-events-none" />
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm font-semibold tracking-wider text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50 uppercase">
              No Image Provided
            </div>
          )}
        </div>

        {/* Bottom Section: Content Module */}
        <div className="relative flex flex-col grow p-5 sm:p-6 sm:pt-4 z-10 overflow-hidden">
          
          {/* Title - PSYCH-UI Fix: Removed green hover state. Text stays pure monochrome. */}
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 transition-colors duration-300 line-clamp-1">
            {title}
          </h2>
          
          {/* Description - PSYCH-UI Fix: Fades out completely on hover so Tech Stack does not overlap it */}
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2 transition-opacity duration-300 group-hover:opacity-0">
            {description}
          </p>

          {/* Tech Stack Module - PSYCH-UI Fix: Added solid backdrop so it perfectly occludes the text below it */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-5 sm:p-6 bg-white/95 dark:bg-[#040405]/95 backdrop-blur-md translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
            {normalizedTechStack.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors duration-300 group-hover:border-primary-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
          
        </div>
      </div>
    </Link>
  );

}

export default ProjectCard;
