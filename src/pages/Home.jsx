// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import projectServices from '../Services/projects.Services.js';
// import siteContentServices from '../Services/site_content.Services.js';
// import HeroSection from '../components/HeroSection';
// import ProjectCard from '../components/ProjectCard';
// import SkillsSection from '../components/SkillsSection';

// function Home() {
//     const { username } = useParams();
//     const targetUser = username || "ayush"; 
//     const navigate = useNavigate();

//     const [projects, setProjects] = useState([]);
//     const [content, setContent] = useState(null);
    
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         ;(async () => {
//             setLoading(true);
//             setError(false);
            
//             try {
//                 const [projectsRes, contentRes] = await Promise.all([
//                     projectServices.getPublicProjects({ username: targetUser, featured: true, cateogary: '' }),
//                     siteContentServices.read({ user: targetUser }).catch(() => null)
//                 ]);
                
//                 setProjects(projectsRes?.data || []);
//                 setContent(contentRes?.data || null);
                
//             } catch (err) {
//                 console.error("Backend Error: User not found or DB empty.", err);
//                 setError(true);
//             } finally {
//                 setLoading(false); 
//             }
//         })();
//     }, [targetUser]);

//     // 1. The Loading State
//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-[70vh]">
//                 <div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
//             </div>
//         );
//     }

//     // 2. The Error / Empty Database State (Fixes your infinite load)
//     if (error) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
//                 <h1 className="text-4xl font-bold text-slate-800">User Not Found</h1>
//                 <p className="mt-4 text-slate-600">
//                     The portfolio for <span className="font-bold text-indigo-600">"{targetUser}"</span> does not exist yet.
//                 </p>
//                 <button 
//                     onClick={() => navigate('/login')}
//                     className="px-6 py-2 mt-6 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
//                 >
//                     Login to Create It
//                 </button>
//             </div>
//         );
//     }

//     // 3. The Success State (Renders when DB has data)
//     return (
//         <div className="w-full">
//             <HeroSection 
//                 name={content?.name} 
//                 role={content?.role}
//                 aboutText={content?.about}
//                 profilePhoto={content?.profilePhotoUrl}
//                 username={targetUser}
//             />

//             <SkillsSection 
//                 skills={content?.skills} 
//                 education={content?.education}
//                 achievements={content?.achievements}
//             />

//             <section className="px-4 py-16 mx-auto bg-slate-50 max-w-7xl">
//                 <h2 className="mb-8 text-3xl font-bold text-center text-slate-900">Featured Work</h2>
                
//                 {/* Handle case where user exists, but has 0 projects */}
//                 {projects.length === 0 ? (
//                     <div className="py-10 text-center text-slate-500">No featured projects uploaded yet.</div>
//                 ) : (
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                         {projects.map((project) => (
//                             <ProjectCard 
//                                 key={project._id}
//                                 title={project.title}
//                                 description={project.description}
//                                 techStack={project.tech_stack}
//                                 category={project.category}
//                                 featuredImage={project.images?.[0]} 
//                                 slug={project.slug}
//                                 username={targetUser}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </section>
//         </div>
//     );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectServices from '../Services/projects.Services.js';
import siteContentServices from '../Services/site_content.Services.js';


import HeroSection from '../components/HeroSection';
import ProjectGrid from '../components/ProjectGrid'; 
import SkillsSection from '../components/SkillsSection';
import CustomSection from '../components/CustomSection'; 


const ComponentMap = {
    hero: HeroSection,
    projects: ProjectGrid,
    skills: SkillsSection,
    custom: CustomSection
};

function Home() {
    const { username } = useParams();
    const targetUser = username || "ayush"; 
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [content, setContent] = useState({});
    
    
    const [layoutOrder, setLayoutOrder] = useState(['hero', 'skills', 'projects']); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        ;(async () => {
            setLoading(true);
            setError(false);
            try {
                const [projectsRes, contentRes] = await Promise.all([
                    projectServices.getPublicProjects({ username: targetUser, featured: true, cateogary: '' }),
                    siteContentServices.read({ user: targetUser }).catch(() => null) 
                ]);
                
                setProjects(projectsRes?.data || []);

            const rawContentArray = contentRes?.data;
                
                // Only parse if data exists AND is not an empty array
                if (Array.isArray(rawContentArray) && rawContentArray.length > 0) {
                    const contentObj = {};
                    
                    rawContentArray.forEach(item => {
                        contentObj[item.sectionKey] = item.contentValue;
                    });
                    
                    setContent(contentObj);

                    // If user saved a custom layout, apply it
                    if (contentObj.page_layout) {
                        setLayoutOrder(JSON.parse(contentObj.page_layout));
                    }
                }
                
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false); 
            }
        })();
    }, [targetUser]);



     if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        );
    }




     if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <h1 className="text-4xl font-bold text-slate-800">User Not Found</h1>
                <p className="mt-4 text-slate-600">
                    The portfolio for <span className="font-bold text-indigo-600">"{targetUser}"</span> does not exist yet.
                </p>
                <button 
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 mt-6 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                    Login to Create It
                </button>
            </div>
        );
    }




   
    const renderComponent = (sectionKey, index) => {
        
        const baseType = sectionKey.split('_')[0]; 
        const Component = ComponentMap[baseType];

        if (!Component) return null; 

        switch (baseType) {
            case 'hero':
                return <Component key={index} name={content.name} role={content.role}
                aboutText={content.aboutText} profilePhoto={content.profilePhotoUrl} username={targetUser}/>;
            case 'projects':
                return <Component key={index} projects={projects} targetUser={targetUser} />;
            case 'skills':
                return <Component key={index} skillsArray={JSON.parse(content.skills || '[]')} />;
            case 'custom':
                
                return <Component key={index} htmlContent={content[sectionKey]} />;
            default:
                return null;
        }
    };


    

    return (
        <div className="w-full">
            
            {layoutOrder.map((sectionKey, index) => renderComponent(sectionKey, index))}
        </div>
    );
}

export default Home;