import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection({ name, role, aboutText, profilePhoto, username }) {
    const navigate = useNavigate();
    
    // Get the first letter for the fallback avatar (e.g., 'A' for Ayush)
    const initial = (name || username || "D").charAt(0).toUpperCase();

    return (
        <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
            
            {/* Profile Photo with Initial Fallback */}
            <div className="w-32 h-32 mb-8 overflow-hidden border-4 border-white rounded-full shadow-lg bg-slate-200">
                {profilePhoto ? (
                    <img src={profilePhoto} alt={name} className="object-cover w-full h-full" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-5xl font-bold text-indigo-600 bg-indigo-100">
                        {initial}
                    </div>
                )}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
                Hi, I'm {name || username}
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-indigo-600 sm:text-2xl">
                {role || "Software Developer"}
            </h2>
            <p className="max-w-2xl mt-4 text-lg text-slate-600 sm:text-xl">
                {aboutText || "Building scalable digital solutions."}
            </p>
            <div className="flex gap-4 mt-8">
                <button 
                    onClick={() => navigate(username ? `/${username}/project` : '/project')}
                    className="px-6 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                    View Projects
                </button>
            </div>
        </section>
    );
}

export default HeroSection;