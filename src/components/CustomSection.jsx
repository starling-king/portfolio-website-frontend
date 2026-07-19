import React from 'react';
import parse from 'html-react-parser'; 

function CustomSection({ htmlContent }) {
    // 1. Set our default structure
    let data = { title: '', htmlText: '', cards: [] };
    
    if (htmlContent) {
        try {
            // STEP 1: Forcefully try to parse the content
            let parsed = JSON.parse(htmlContent);
            
            // STEP 2: The Double-String Failsafe
            // If the database wrapped it in extra quotes, parsing it once just returns a string.
            // If so, we parse it a second time to extract the actual object.
            if (typeof parsed === 'string') {
                parsed = JSON.parse(parsed);
            }
            
            // STEP 3: Assign the extracted data
            if (parsed && typeof parsed === 'object') {
                data = { ...data, ...parsed }; // Merge to ensure no undefined errors
            } else {
                data.htmlText = htmlContent;
            }
        } catch (e) {
            // If parsing fails completely, it's just standard text from an older version
            data.htmlText = htmlContent;
        }
    }

    const alignMap = { left: 'text-left', center: 'text-center', right: 'text-right' };
    const fontMap = { sans: 'font-sans', serif: 'font-serif', mono: 'font-mono' };

    return (
        <section className="px-4 py-16 mx-auto max-w-7xl">
            {data.title && (
                <h2 className="mb-10 text-3xl font-extrabold text-center text-slate-900">
                    {data.title}
                </h2>
            )}
            
            {data.htmlText && (
                <div className="max-w-4xl mx-auto mb-12 prose prose-indigo lg:prose-lg text-slate-700">
                    {parse(data.htmlText)}
                </div>
            )}

            {data.cards && data.cards.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.cards.map((card, index) => (
                        <div 
                            key={index} 
                            className={`p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow
                                ${alignMap[card.align] || 'text-left'} 
                                ${fontMap[card.font] || 'font-sans'}
                            `}
                        >
                            <h3 className="mb-3 text-xl font-bold text-slate-800">{card.title}</h3>
                            <p className="leading-relaxed text-slate-600 whitespace-pre-wrap">{card.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CustomSection;

// import React from 'react';
// import parse from 'html-react-parser'; 

// function CustomSection({ htmlContent }) {
//     let data = { title: '', htmlText: '', cards: [] };

//     // 1. The Upgraded, Bulletproof Parser
//     const safelyParseContent = (content) => {
//         if (!content) return null;
        
//         // THE FIX: Clean up hidden control characters (newlines) before parsing.
//         // This converts actual newlines into literal '\n' so JSON.parse doesn't crash.
//         let sanitized = content
//             .replace(/\n/g, "\\n")
//             .replace(/\r/g, "\\r")
//             .replace(/\t/g, "\\t");
        
//         let parsed = sanitized;
//         let attempt = 0;
        
//         // Loop up to 3 times to unwrap Mongoose strings safely
//         while (typeof parsed === 'string' && parsed.trim().startsWith('{') && attempt < 3) {
//             try {
//                 parsed = JSON.parse(parsed);
//                 attempt++;
//             } catch (e) {
//                 break; // If it fails, break the loop and return the string
//             }
//         }
//         return parsed;
//     };
    
//     // 2. Extract and Assign Data
//     if (htmlContent) {
//         const extractedData = safelyParseContent(htmlContent);
        
//         if (extractedData && typeof extractedData === 'object') {
//             data = { ...data, ...extractedData }; 
//         } else {
//             data.htmlText = htmlContent;
//         }
//     }

//     const alignMap = { left: 'text-left', center: 'text-center', right: 'text-right' };
//     const fontMap = { sans: 'font-sans', serif: 'font-serif', mono: 'font-mono' };

//     return (
//         <section className="px-4 py-16 mx-auto max-w-7xl">
//             {data.title && (
//                 <h2 className="mb-10 text-3xl font-extrabold text-center text-slate-900">
//                     {data.title}
//                 </h2>
//             )}
            
//             {data.htmlText && (
//                 <div className="max-w-4xl mx-auto mb-12 prose prose-indigo lg:prose-lg text-slate-700">
//                     {parse(data.htmlText)}
//                 </div>
//             )}

//             {data.cards && data.cards.length > 0 && (
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {data.cards.map((card, index) => (
//                         <div 
//                             key={index} 
//                             className={`p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow
//                                 ${alignMap[card.align] || 'text-left'} 
//                                 ${fontMap[card.font] || 'font-sans'}
//                             `}
//                         >
//                             <h3 className="mb-3 text-xl font-bold text-slate-800">{card.title}</h3>
//                             <p className="leading-relaxed text-slate-600 whitespace-pre-wrap">{card.text}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </section>
//     );
// }

// export default CustomSection;