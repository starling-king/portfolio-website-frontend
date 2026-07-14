import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveProject } from '../store/ProjectSlice';
import projectServices from '../Services/projects.Services';

function ProjectDetail() {
    const { username, slug } = useParams();
    const targetUser = username || "ayush";
    const dispatch = useDispatch();

    // Pull from Redux to see if we already have the data cached
    const allProjects = useSelector((state) => state.ProjectReducer.allProjects);
    
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadProjectData = async () => {
            setLoading(true);
            
            // 1. Check local Redux cache first
            const cachedProject = allProjects.find(p => p.slug === slug);
            
            if (cachedProject) {
                setProject(cachedProject);
                dispatch(setActiveProject(cachedProject._id));
                setLoading(false);
            } else {
                // 2. Fallback to API if a user visits the URL directly
                try {
                    const response = await projectServices.getProjectBySlug({ username: targetUser, slug });
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

    // Image Slider Navigation Logic
    const nextImage = () => {
        if (project?.image) {
            setCurrentImageIndex((prev) => (prev === project.image.length - 1 ? 0 : prev + 1));
        }
    };

    const prevImage = () => {
        if (project?.image) {
            setCurrentImageIndex((prev) => (prev === 0 ? project.image.length - 1 : prev - 1));
        }
    };

    if (loading) return <div className="flex justify-center py-20 animate-pulse">Loading project data...</div>;
    if (!project) return <div className="py-20 text-center">Project not found.</div>;

    return (
        <div className="px-4 py-16 mx-auto max-w-5xl">
            {/* Back Button */}
            <Link to={`/${targetUser}/projects`} className="inline-block mb-8 text-indigo-600 hover:underline">
                &larr; Back to all projects
            </Link>

            {/* Header Area */}
            <div className="mb-10">
                <span className="text-sm font-bold tracking-wider text-indigo-600 uppercase">{project.category}</span>
                <h1 className="mt-2 text-4xl font-extrabold text-slate-900">{project.title}</h1>
            </div>

            {/* Native Image Slider */}
            {project.image && project.image.length > 0 && (
                <div className="relative w-full overflow-hidden bg-slate-100 rounded-xl aspect-video group">
                    <img 
                        src={project.image[currentImageIndex].imageUrl} 
                        alt={project.image[currentImageIndex].altText || `Slide ${currentImageIndex}`} 
                        className="block object-cover w-full h-full"
                    />
                    
                    {/* Only show arrows if there is more than 1 image */}
                    {project.image.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                &#10094;
                            </button>
                            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                &#10095;
                            </button>
                            
                            {/* Dots indicator */}
                            <div className="absolute flex gap-2 bottom-4 left-1/2 -translate-x-1/2">
                                {project.image.map((_, idx) => (
                                    <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-3">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                    <p className="mt-4 leading-relaxed text-slate-600">{project.description}</p>
                    
                    {project.problem && (
                        <>
                            <h2 className="mt-8 text-2xl font-bold text-slate-800">The Problem</h2>
                            <p className="mt-4 leading-relaxed text-slate-600">{project.problem}</p>
                        </>
                    )}
                    {/* Add more sections like approach, solution, result based on your schema */}
                </div>

                <div className="p-6 bg-slate-50 rounded-xl h-fit">
                    <h3 className="font-bold text-slate-900">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack?.map((tech, i) => (
                            <span key={i} className="px-3 py-1 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 mt-8">
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="w-full py-2 text-center text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
                                View Live Site
                            </a>
                        )}
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="w-full py-2 text-center transition-colors bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                                View Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;