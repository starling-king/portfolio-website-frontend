// import React from "react";
// import parse from "html-react-parser";

// function CustomSection({ htmlContent }) {
//   let data = { title: "", htmlText: "", cards: [] };

//   const safelyParseContent = (content) => {
//     if (!content) return null;

//     let sanitized = content
//       .replace(/\n/g, "\\n")
//       .replace(/\r/g, "\\r")
//       .replace(/\t/g, "\\t");

//     let parsed = sanitized;
//     let attempt = 0;

//     while (
//       typeof parsed === "string" &&
//       parsed.trim().startsWith("{") &&
//       attempt < 3
//     ) {
//       try {
//         parsed = JSON.parse(parsed);
//         attempt++;
//       } catch (e) {
//         break;
//       }
//     }
//     return parsed;
//   };

//   if (htmlContent) {
//     const extractedData = safelyParseContent(htmlContent);

//     if (extractedData && typeof extractedData === "object") {
//       data = { ...data, ...extractedData };
//     } else {
//       data.htmlText = htmlContent;
//     }
//   }

//   const alignMap = {
//     left: "text-left",
//     center: "text-center",
//     right: "text-right",
//   };
//   const fontMap = { sans: "font-sans", serif: "font-serif", mono: "font-mono" };

//   return (
//     <section className="px-4 py-16 mx-auto max-w-7xl">
//       {data.title && (
//         <h2 className="mb-10 text-3xl font-extrabold text-center text-slate-900">
//           {data.title}
//         </h2>
//       )}

//       {data.htmlText && (
//         <div className="max-w-4xl mx-auto mb-12 prose prose-indigo lg:prose-lg text-slate-700">
//           {parse(data.htmlText)}
//         </div>
//       )}

//       {data.cards && data.cards.length > 0 && (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {data.cards.map((card, index) => (
//             <div
//               key={index}
//               className={`p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow
//                                 ${alignMap[card.align] || "text-left"}
//                                 ${fontMap[card.font] || "font-sans"}
//                             `}
//             >
//               <h3 className="mb-3 text-xl font-bold text-slate-800">
//                 {card.title}
//               </h3>
//               <p className="leading-relaxed text-slate-600 whitespace-pre-wrap">
//                 {card.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default CustomSection;


import React from "react";
import parse from "html-react-parser";

function CustomSection({ htmlContent }) {
  let data = { title: "", htmlText: "", cards: [] };

  // STRICT RULE: Business logic left 100% untouched.
  const safelyParseContent = (content) => {
    if (!content) return null;

    let sanitized = content
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");

    let parsed = sanitized;
    let attempt = 0;

    while (
      typeof parsed === "string" &&
      parsed.trim().startsWith("{") &&
      attempt < 3
    ) {
      try {
        parsed = JSON.parse(parsed);
        attempt++;
      } catch (e) {
        break;
      }
    }
    return parsed;
  };

  if (htmlContent) {
    const extractedData = safelyParseContent(htmlContent);

    if (extractedData && typeof extractedData === "object") {
      data = { ...data, ...extractedData };
    } else {
      data.htmlText = htmlContent;
    }
  }

  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const fontMap = { sans: "font-sans", serif: "font-serif", mono: "font-mono" };

  return (
    // PSYCH-UI: Dynamic spacing and global background inheritance
    <section className="relative px-4 py-16 sm:py-24 mx-auto max-w-7xl transition-colors duration-300">
      
      {/* 1. Cognitive Anchoring: Section Header */}
      {data.title && (
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm gpu-layer cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
              Insight
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight text-center">
            {data.title}
          </h2>
        </div>
      )}

      {/* 2. Typographic Content (HTML Parser) */}
      {data.htmlText && (
        // PSYCH-UI Fix: Forced prose to inherit Dark Mode safely (prose-invert). 
        // Overrode default Indigo links/markers with Tactical Emerald.
        <div className="max-w-4xl mx-auto mb-16 prose prose-slate dark:prose-invert lg:prose-lg text-slate-600 dark:text-slate-400 prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500 transition-colors duration-300 gpu-layer">
          {parse(data.htmlText)}
        </div>
      )}

      {/* 3. Benthic Text Cards Grid */}
      {data.cards && data.cards.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card, index) => (
            <div
              key={index}
              className={`relative flex flex-col h-full p-6 sm:p-8 bg-white/60 dark:bg-[#040405]/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] group gpu-layer overflow-hidden
                ${alignMap[card.align] || "text-left"}
                ${fontMap[card.font] || "font-sans"}
              `}
            >
              {/* Ambient Internal Hover Glow */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-emerald-50/50 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="relative z-10 mb-4 text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {card.title}
              </h3>
              
              <p className="relative z-10 leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap transition-colors duration-300">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CustomSection;