// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setActiveProject } from "../store/ProjectSlice";
// import projectServices from "../Services/projects.Services";

// function ProjectDetail() {
//   const { username, slug } = useParams();
//   const targetUser = username || "ayush";
//   const dispatch = useDispatch();

//   const allProjects = useSelector((state) => state.ProjectReducer.allProjects);

//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const loadProjectData = async () => {
//       setLoading(true);

//       const cachedProject = allProjects.find((p) => p.slug === slug);

//       if (cachedProject) {
//         setProject(cachedProject);
//         dispatch(setActiveProject(cachedProject._id));
//         setLoading(false);
//       } else {
//         try {
//           const response = await projectServices.getProjectBySlug({
//             username: targetUser,
//             slug,
//           });
//           if (response?.data) {
//             setProject(response.data);
//             dispatch(setActiveProject(response.data._id));
//           }
//         } catch (error) {
//           console.error("Error fetching project details", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     loadProjectData();
//   }, [slug, targetUser, allProjects, dispatch]);

//   const nextImage = () => {
//     if (project?.image) {
//       setCurrentImageIndex((prev) =>
//         prev === project.image.length - 1 ? 0 : prev + 1,
//       );
//     }
//   };

//   const prevImage = () => {
//     if (project?.image) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? project.image.length - 1 : prev - 1,
//       );
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center py-20 animate-pulse">
//         Loading project data...
//       </div>
//     );
//   if (!project)
//     return <div className="py-20 text-center">Project not found.</div>;

//   return (
//     <div className="px-4 py-16 mx-auto max-w-5xl">
//       <Link
//         to={`/${targetUser}/projects`}
//         className="inline-block mb-8 text-indigo-600 hover:underline"
//       >
//         &larr; Back to all projects
//       </Link>

//       <div className="mb-10">
//         <span className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
//           {project.category}
//         </span>
//         <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
//           {project.title}
//         </h1>
//       </div>

//       {project.image && project.image.length > 0 && (
//         <div className="relative w-full overflow-hidden bg-slate-100 rounded-xl aspect-video group">
//           <img
//             src={project.image[currentImageIndex].imageUrl}
//             alt={
//               project.image[currentImageIndex].altText ||
//               `Slide ${currentImageIndex}`
//             }
//             className="block object-cover w-full h-full"
//           />

//           {project.image.length > 1 && (
//             <>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 &#10094;
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 &#10095;
//               </button>

//               <div className="absolute flex gap-2 bottom-4 left-1/2 -translate-x-1/2">
//                 {project.image.map((_, idx) => (
//                   <div
//                     key={idx}
//                     className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-3">
//         <div className="md:col-span-2">
//           <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
//           <p className="mt-4 leading-relaxed text-slate-600">
//             {project.description}
//           </p>

//           {project.problem && (
//             <>
//               <h2 className="mt-8 text-2xl font-bold text-slate-800">
//                 The Problem
//               </h2>
//               <p className="mt-4 leading-relaxed text-slate-600">
//                 {project.problem}
//               </p>
//             </>
//           )}
//         </div>

//         <div className="p-6 bg-slate-50 rounded-xl h-fit">
//           <h3 className="font-bold text-slate-900">Tech Stack</h3>
//           <div className="flex flex-wrap gap-2 mt-4">
//             {project.techStack?.map((tech, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>

//           <div className="flex flex-col gap-3 mt-8">
//             {project.liveLink && (
//               <a
//                 href={project.liveLink}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-full py-2 text-center text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
//               >
//                 View Live Site
//               </a>
//             )}
//             {project.githubLink && (
//               <a
//                 href={project.githubLink}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-full py-2 text-center transition-colors bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
//               >
//                 View Source Code
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectDetail;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../store/ProjectSlice";
import projectServices from "../Services/projects.Services";

function ProjectDetail() {
  // ----------------------------------------------------------------------
  // BUSINESS LOGIC (Strictly Untouched)
  // ----------------------------------------------------------------------
  const { username, slug } = useParams();
  const targetUser = username || "ayush";
  const dispatch = useDispatch();

  const allProjects = useSelector((state) => state.ProjectReducer.allProjects);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProjectData = async () => {
      setLoading(true);

      const cachedProject = allProjects.find((p) => p.slug === slug);

      if (cachedProject) {
        setProject(cachedProject);
        dispatch(setActiveProject(cachedProject._id));
        setLoading(false);
      } else {
        try {
          const response = await projectServices.getProjectBySlug({
            username: targetUser,
            slug,
          });
          if (response?.data) {
            setProject(response.data);
            dispatch(setActiveProject(response.data._id));
          }
        } catch (error) {
          console.error("Error fetching project details", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjectData();
  }, [slug, targetUser, allProjects, dispatch]);

  // AUTOPLAY SLIDESHOW ENGINE (Added per your request)
  useEffect(() => {
    if (!project?.image || project.image.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.image.length - 1 ? 0 : prev + 1
      );
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [project?.image]);

  const nextImage = () => {
    if (project?.image) {
      setCurrentImageIndex((prev) =>
        prev === project.image.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (project?.image) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.image.length - 1 : prev - 1,
      );
    }
  };

  // ----------------------------------------------------------------------
  // PSYCH-UI RENDER (Cinematic Presentation)
  // ----------------------------------------------------------------------

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-transparent text-primary-600 dark:text-primary-400 font-black tracking-widest uppercase text-[10px] sm:text-xs transition-colors duration-500">
        <div className="relative flex items-center justify-center w-12 h-12 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-20 animate-ping"></div>
          <svg className="w-8 h-8 animate-spin text-primary-500 opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        Decrypting Project Data...
      </div>
    );

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-[75vh]">
        <div className="p-8 text-center bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Project Null</h2>
          <p className="text-slate-500 dark:text-slate-400">This asset does not exist or has been archived.</p>
          <Link to={`/${targetUser}/projects`} className="inline-block mt-6 px-6 py-2.5 text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors">
            Return to Grid
          </Link>
        </div>
      </div>
    );

  return (
    <section className="relative min-h-screen px-4 py-16 sm:py-24 transition-colors duration-300 overflow-hidden">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_30%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl animate-[slideDown_0.5s_ease-out]">
        
        {/* Navigation & Header */}
        <div className="mb-10">
          <Link
            to={`/${targetUser}/projects`}
            className="inline-flex items-center gap-2 mb-8 text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase hover:text-primary-600 dark:hover:text-primary-400 transition-colors group gpu-layer"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Grid
          </Link>

          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-lg shadow-sm gpu-layer">
              {project.category || "Uncategorized"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Cinematic Crossfade Slider */}
        {project.image && project.image.length > 0 && (
          <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-2xl rounded-4xl aspect-video sm:aspect-21/9 group gpu-layer isolate">
            
            {/* Ambient Background Glow matching the dynamic theme */}
            <div className="absolute -inset-10 bg-linear-to-tr from-primary-500/10 to-transparent blur-3xl -z-10" />

            {/* Images: Render all, fade opacity for smooth transition */}
            {project.image.map((img, idx) => (
              <img
                key={idx}
                src={img.imageUrl}
                alt={img.altText || `Slide ${idx}`}
                className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
                  idx === currentImageIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                }`}
              />
            ))}

            {/* Manual Controls (Fade in on hover) */}
            {project.image.length > 1 && (
              <>
                {/* Gradient overlays to make controls visible against light/dark images */}
                <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transform-gpu hover:scale-110 transition-all duration-300 z-30 focus:outline-none"
                >
                  <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transform-gpu hover:scale-110 transition-all duration-300 z-30 focus:outline-none"
                >
                  <svg className="w-6 h-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Progress Indicators */}
                <div className="absolute flex gap-2.5 bottom-6 left-1/2 -translate-x-1/2 z-30">
                  {project.image.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        idx === currentImageIndex 
                          ? "w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                          : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Narrative & Analytics Grid */}
        <div className="grid grid-cols-1 gap-12 mt-16 lg:grid-cols-12">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed">
              <h2>Overview</h2>
              <p>{project.description}</p>

              {project.problem && (
                <>
                  <h2 className="mt-12">The Challenge</h2>
                  <p>{project.problem}</p>
                </>
              )}
            </div>
          </div>

          {/* Right Action Column (Sticky Dashboard) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col p-8 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
              
              <h3 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-5">
                Technology Matrix
              </h3>
              
              <div className="flex flex-wrap gap-2.5 mb-10">
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-5">
                Project Uplinks
              </h3>

              <div className="flex flex-col gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between py-3.5 px-5 rounded-xl shadow-md hover:shadow-[0_0_20px_var(--theme-primary-glow)] hover:-translate-y-0.5 text-[12px] font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 transition-all duration-300 gpu-layer group"
                  >
                    <span>View Live Build</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between py-3.5 px-5 rounded-xl text-[12px] font-black tracking-widest uppercase text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 gpu-layer group"
                  >
                    <span>Source Code</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
