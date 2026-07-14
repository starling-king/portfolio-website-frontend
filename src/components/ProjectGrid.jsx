import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectGrid({ projects, targetUser }) {
    return (
        <section className="px-4 py-16 mx-auto bg-slate-50 max-w-7xl">
            <h2 className="mb-8 text-3xl font-bold text-center text-slate-900">Featured Work</h2>
            
            {/* Safe fallback if no projects exist */}
            {!projects || projects.length === 0 ? (
                <div className="py-10 text-center text-slate-500">No featured projects uploaded yet.</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard 
                            key={project._id}
                            title={project.title}
                            description={project.description}
                            techStack={project.tech_stack}
                            category={project.category}
                            featuredImage={project.image?.[0]?.imageUrl}
                            slug={project.slug}
                            username={targetUser}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProjectGrid;