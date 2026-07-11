import React from 'react';

// A purely dumb component that renders whatever raw HTML the admin created
function CustomSection({ htmlContent }) {
    
    if (!htmlContent) return null;

    return (
        <section className="px-4 py-16 mx-auto bg-white max-w-7xl">
            {/* 
              The 'prose' class comes from @tailwindcss/typography. 
              It automatically styles raw HTML tags (h1, p, ul, li, strong) beautifully.
            */}
            <div 
                className="max-w-4xl mx-auto prose prose-indigo lg:prose-lg text-slate-700"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </section>
    );
}

export default CustomSection;