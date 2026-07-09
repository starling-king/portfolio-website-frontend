import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectServices from '../Services/projects.Services.js';
import ProjectCard from '../components/ProjectCard';

function Projects() {
    const { username } = useParams();
    const targetUser = username || "ayush";

    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ;(async () => {
            setLoading(true);
            try {
                
                const res = await projectServices.getPublicProjects({ username: targetUser, featured: false, cateogary: '' });
                setAllProjects(res?.data || []);
            } catch (error) {
                console.error("Error fetching all projects:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [targetUser]);

    if (loading) return <div className="text-center py-20">Loading portfolio...</div>;

    return (
        <div className="px-4 py-12 mx-auto max-w-7xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900">All Projects</h1>
                <p className="mt-4 text-slate-600">A comprehensive list of works built by {targetUser}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                    <ProjectCard 
                        key={project._id}
                        title={project.title}
                        description={project.description}
                        techStack={project.tech_stack}
                        category={project.category}
                        featuredImage={project.images?.[0]}
                        slug={project.slug}
                        username={targetUser}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;