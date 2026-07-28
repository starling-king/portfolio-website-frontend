import React from "react";
import parse from "html-react-parser";

function CustomSection({ htmlContent }) {
  let data = { title: "", htmlText: "", cards: [] };

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
                                ${alignMap[card.align] || "text-left"}
                                ${fontMap[card.font] || "font-sans"}
                            `}
            >
              <h3 className="mb-3 text-xl font-bold text-slate-800">
                {card.title}
              </h3>
              <p className="leading-relaxed text-slate-600 whitespace-pre-wrap">
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
