import React from 'react';

function SkillsSection({ skillsArray }) {
    // Fallback if no skills are provided
    const displaySkills = skillsArray?.length > 0 ? skillsArray : ["JavaScript", "React", "Node.js", "MongoDB"];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl px-4 mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900">Technical Arsenal</h2>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {displaySkills.map((skill, index) => (
                        <div 
                            key={index}
                            className="px-4 py-2 text-sm font-medium border rounded-full text-slate-700 border-slate-200 bg-slate-50"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;