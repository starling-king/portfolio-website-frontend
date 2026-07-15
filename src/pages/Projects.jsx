// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import projectServices from '../Services/projects.Services.js';
// import ProjectCard from '../components/ProjectCard';

// function Projects() {
//     const { username } = useParams();
//     const targetUser = username || "ayush";

//     const [allProjects, setAllProjects] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const storedProjects = useSelector((state) => state.ProjectReducer.allProjects);

//     useEffect(() => {
//         ;(async () => {
//             setLoading(true);
//             try {
                
//                 const res = await projectServices.getPublicProjects({ username: targetUser, featured: false, cateogary: '' });
//                 setAllProjects(res?.data || []);
//             } catch (error) {
//                 console.error("Error fetching all projects:", error);
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, [targetUser]);

//     if (loading) return <div className="text-center py-20">Loading portfolio...</div>;

//     return (
//         <div className="px-4 py-12 mx-auto max-w-7xl">
//             <div className="mb-12">
//                 <h1 className="text-4xl font-bold text-slate-900">All Projects</h1>
//                 <p className="mt-4 text-slate-600">A comprehensive list of works built by {targetUser}.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {allProjects.map((project) => (
//                     <ProjectCard 
//                         key={project._id}
//                         title={project.title}
//                         description={project.description}
//                         techStack={project.techStack}
//                         category={project.category}
//                         featuredImage={project.images?.[0]}
//                         slug={project.slug}
//                         username={targetUser}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Projects;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllProjects } from '../store/ProjectSlice'; 
import projectServices from '../Services/projects.Services';
import ProjectCard from '../components/ProjectCard';

function Projects() {
    const { username } = useParams();
    const targetUser = username || "ayush";
    const dispatch = useDispatch();
    
    // Subscribe to the Redux store
    const storedProjects = useSelector((state) => state.ProjectReducer.allProjects);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // The 1% Optimization: If we already have projects in Redux, don't fetch again!
        if (storedProjects && storedProjects.length > 0) {
            setLoading(false);
            return;
        }

        const fetchAllProjects = async () => {
            setLoading(true);
            try {
                // Fetch all projects (no featured filter)
                const response = await projectServices.getPublicProjects({ 
                    username: targetUser, 
                    featured: '', 
                    cateogary: '' 
                });
                
                // Dispatch to Redux Store globally
                if (response?.data) {
                    dispatch(setAllProjects(response.data));
                }
            } catch (err) {
                console.error("Failed to fetch projects", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProjects();
    }, [targetUser, dispatch, storedProjects.length]);

    if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>;
    if (error) return <div className="py-20 text-center text-red-500">Failed to load projects.</div>;

    return (
        <div className="px-4 py-16 mx-auto max-w-7xl">
            <h1 className="mb-10 text-4xl font-bold text-center text-slate-900">All Projects</h1>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {storedProjects.map((project) => (
                    <ProjectCard 
                        key={project._id}
                        title={project.title}
                        description={project.description}
                        techStack={project.techStack}
                        category={project.category}
                        featuredImage={project.image?.[0]?.imageUrl} // Using your fixed image logic
                        slug={project.slug}
                        username={targetUser}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;