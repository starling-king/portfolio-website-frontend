import React from "react";

function ResumePreview({ resumeData }) {
    if (!resumeData) return null;

    // Parse generated JSON safely
    let data = {};
    try {
        data =
            typeof resumeData.generatedContent === "string"
                ? JSON.parse(resumeData.generatedContent)
                : resumeData.generatedContent;
    } catch (e) {
        return (
            <div className="text-red-500 font-bold p-4">
                Error parsing resume format.
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full flex flex-col items-center py-8 bg-slate-100 min-h-screen">
            {/* Action Bar */}
            <div className="mb-6 flex gap-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md transition-all flex items-center gap-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Download PDF
                </button>
            </div>

            {/* A4 Paper Canvas */}
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-10 text-slate-800 font-sans leading-relaxed print:shadow-none print:w-full print:p-0">
                {/* Header */}
                <header className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
                    <h1 className="text-3xl font-extrabold uppercase tracking-wider text-slate-900">
                        {data.header?.name}
                    </h1>
                    <p className="text-sm font-medium text-slate-600 mt-1">
                        {data.header?.email}
                    </p>
                    {data.header?.links && (
                        <div className="flex justify-center gap-4 text-xs font-semibold text-indigo-600 mt-2">
                            {Object.entries(data.header.links).map(([key, val]) => {
                                // FIX: If the AI returns an empty string or null, do not render the link label!
                                if (!val || String(val).trim() === "") return null; 
                                
                                // Ensure the URL has https:// so it is actually clickable
                                const formattedUrl = val.startsWith('http') ? val : `https://${val}`;
                                
                                return (
                                    <a
                                        key={key}
                                        href={formattedUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:underline"
                                    >
                                        {key.toUpperCase()}: {val}
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </header>

                {/* Skills Section */}
                {/* {data.skills && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-slate-200 pb-1 mb-2">
                            Technical Skills
                        </h2>
                        <div className="text-xs space-y-1">
                            {data.skills.languages && (
                                <p>
                                    <strong>Languages:</strong> {data.skills.languages.join(", ")}
                                </p>
                            )}
                            {data.skills.frameworks && (
                                <p>
                                    <strong>Frameworks/Libraries:</strong>{" "}
                                    {data.skills.frameworks.join(", ")}
                                </p>
                            )}
                            {data.skills.tools && (
                                <p>
                                    <strong>Tools & Platforms:</strong>{" "}
                                    {data.skills.tools.join(", ")}
                                </p>
                            )}
                        </div>
                    </section>
                )} */}

                {/* Projects Section */}
                {/* {data.projects && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-slate-200 pb-1 mb-3">
                            Key Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-bold text-slate-900">
                                            {proj.title}
                                        </h3>
                                        <span className="text-xs font-medium text-slate-500">
                                            {proj.techStack}
                                        </span>
                                    </div>
                                    <ul className="list-disc list-inside text-xs text-slate-700 mt-1 space-y-1">
                                        {proj.bulletPoints?.map((bullet, bIdx) => (
                                            <li
                                                key={bIdx}
                                                dangerouslySetInnerHTML={{ __html: bullet }}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )} */}

                {/* Skills Section */}
                {data.skills && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-slate-200 pb-1 mb-2">
                            Technical Skills
                        </h2>
                        <div className="text-xs space-y-1">
                            {data.skills.languages && (
                                <p>
                                    <strong>Languages:</strong> <span dangerouslySetInnerHTML={{ __html: data.skills.languages.join(", ") }} />
                                </p>
                            )}
                            {data.skills.frameworks && (
                                <p>
                                    <strong>Frameworks/Libraries:</strong> <span dangerouslySetInnerHTML={{ __html: data.skills.frameworks.join(", ") }} />
                                </p>
                            )}
                            {data.skills.tools && (
                                <p>
                                    <strong>Tools & Platforms:</strong> <span dangerouslySetInnerHTML={{ __html: data.skills.tools.join(", ") }} />
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {data.projects && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-slate-200 pb-1 mb-3">
                            Key Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-bold text-slate-900">
                                            {proj.title}
                                        </h3>
                                        {/* FIX: Render techStack with dangerouslySetInnerHTML */}
                                        <span 
                                            className="text-xs font-medium text-slate-500" 
                                            dangerouslySetInnerHTML={{ __html: proj.techStack }} 
                                        />
                                    </div>
                                    <ul className="list-disc list-inside text-xs text-slate-700 mt-1 space-y-1">
                                        {proj.bulletPoints?.map((bullet, bIdx) => (
                                            <li
                                                key={bIdx}
                                                dangerouslySetInnerHTML={{ __html: bullet }}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-slate-200 pb-1 mb-2">
                            Education
                        </h2>
                        <p className="text-xs font-medium text-slate-800">
                            {data.education}
                        </p>
                    </section>
                )}

                {/* Dynamic Additional Sections (Achievements, Certifications, etc.) */}
                {data.additionalSections && data.additionalSections.length > 0 && (
                    <section className="mb-6">
                        {data.additionalSections.map((sec, idx) => (
                            <div key={idx} className="mb-4">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-700 border-b border-slate-200 pb-1 mb-2">
                                    {sec.title}
                                </h2>
                                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                    {Array.isArray(sec.content) ? (
                                        sec.content.map((item, cIdx) => (
                                            <li
                                                key={cIdx}
                                                dangerouslySetInnerHTML={{ __html: item }}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-700">{sec.content}</p>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}

export default ResumePreview;
