import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Admin() {
    // 1. Pull data directly from Redux Store
    const authData = useSelector((state) => state.AuthReducer.data);
    const adminProjects = useSelector((state) => state.ProjectReducer.adminProjects);

    // Safely extract the username from your auth state
    const username = authData?.user?.username || "ayush"; 

    // 2. Crunch the numbers dynamically
    const totalProjects = adminProjects.length;
    const featuredProjects = adminProjects.filter(project => project.isFeatured).length;
    const publishedProjects = adminProjects.filter(project => project.isPublished).length;

    // 3. Extract unique skills using a Set
    // flatMap combines all techStack arrays into one massive array.
    // Set() automatically removes any duplicates!
    const allSkills = adminProjects.flatMap(project => project.techStack || []);
    const uniqueSkills = [...new Set(allSkills)];

    // 4. Copy to Clipboard Logic
    const [copied, setCopied] = useState(false);
    const portfolioUrl = `https://www.ayushdev.online/${username}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(portfolioUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset button after 2 seconds
    };

    return (
        <div className="w-full px-4 py-8 mx-auto max-w-7xl">
            
            {/* Header & Copy Link Section */}
            <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back, {username}! 👋</h1>
                    <p className="mt-2 text-slate-600">Here is the overview of your system and portfolio data.</p>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-white border rounded-lg shadow-sm border-slate-200">
                    <span className="hidden px-2 text-sm font-medium text-slate-500 sm:block">
                        {portfolioUrl}
                    </span>
                    <button 
                        onClick={handleCopyLink}
                        className={`px-4 py-2 text-sm font-bold text-white transition-colors rounded-md ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* Total Projects Card */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase">Total Projects</h3>
                        <div className="p-2 text-indigo-600 bg-indigo-50 rounded-lg">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-extrabold text-slate-900">{totalProjects}</p>
                </div>

                {/* Published Projects Card */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase">Published</h3>
                        <div className="p-2 text-green-600 bg-green-50 rounded-lg">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-extrabold text-slate-900">{publishedProjects}</p>
                </div>

                {/* Featured Projects Card */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase">Featured</h3>
                        <div className="p-2 text-yellow-600 bg-yellow-50 rounded-lg">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-extrabold text-slate-900">{featuredProjects}</p>
                </div>

                {/* Quick Actions Card */}
                <div className="p-6 text-white bg-slate-900 border border-slate-800 rounded-2xl shadow-sm flex flex-col justify-center">
                    <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-4">Quick Actions</h3>
                    <div className="flex gap-3">
                        <Link to="/admin/projects/new" className="flex-1 text-center py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                            + Add Project
                        </Link>
                        <Link to="/admin/messages" className="flex-1 text-center py-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
                            Inbox
                        </Link>
                    </div>
                </div>
            </div>

            {/* Skills & Technologies Section */}
            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Aggregated Tech Stack</h2>
                <p className="text-slate-600 mb-6 text-sm">
                    These are all the unique skills automatically extracted from your uploaded projects. To add more here, add them to your project tech stacks.
                </p>
                
                {uniqueSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {uniqueSkills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-full hover:bg-slate-200 transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
                        <p className="text-slate-500">No skills found yet. Add some tech stacks to your projects!</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Admin;