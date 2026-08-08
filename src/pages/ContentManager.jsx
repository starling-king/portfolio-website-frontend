// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import siteContentServices from "../Services/site_content.Services.js";
// import { Editor } from "@tinymce/tinymce-react";
// import conf from "../config/config.js";

// function ContentManager() {
//   const currentUser = useSelector((state) => state.AuthReducer.data);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");

//   const [layoutOrder, setLayoutOrder] = useState([
//     "hero",
//     "skills",
//     "projects",
//   ]);
//   const [customBlocks, setCustomBlocks] = useState({});

//   const [expandedSection, setExpandedSection] = useState(null);

//   useEffect(() => {
//     const loadContent = async () => {
//       try {
//         const targetUsername =
//           currentUser?.username || currentUser?.user?.username;
//         if (targetUsername) {
//           const res = await siteContentServices.read({ user: targetUsername });

//           if (res?.data && Array.isArray(res.data)) {
//             let savedLayout = ["hero", "skills", "projects"];
//             const blocks = {};

//             const layoutItem = res.data.find(
//               (item) => item.sectionKey === "page_layout",
//             );
//             if (layoutItem) {
//               try {
//                 savedLayout = JSON.parse(layoutItem.contentValue);
//               } catch (e) {
//                 console.error("Layout parse error", e);
//               }
//             }

//             res.data.forEach((item) => {
//               if (item.sectionKey.startsWith("custom_")) {
//                 try {
//                   let sanitized = item.contentValue
//                     .replace(/\n/g, "\\n")
//                     .replace(/\r/g, "\\r")
//                     .replace(/\t/g, "\\t");

//                   let parsed = sanitized;
//                   let attempt = 0;

//                   while (
//                     typeof parsed === "string" &&
//                     parsed.trim().startsWith("{") &&
//                     attempt < 3
//                   ) {
//                     parsed = JSON.parse(parsed);
//                     attempt++;
//                   }

//                   blocks[item.sectionKey] = parsed;
//                 } catch (e) {
//                   blocks[item.sectionKey] = {
//                     title: "Recovered Section",
//                     htmlText: item.contentValue,
//                     cards: [],
//                   };
//                 }
//               }
//             });

//             setLayoutOrder(savedLayout);
//             setCustomBlocks(blocks);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load content manager data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadContent();
//   }, [currentUser]);

//   const moveItem = (index, direction) => {
//     const newLayout = [...layoutOrder];
//     if (direction === "up" && index > 0) {
//       [newLayout[index - 1], newLayout[index]] = [
//         newLayout[index],
//         newLayout[index - 1],
//       ];
//     } else if (direction === "down" && index < newLayout.length - 1) {
//       [newLayout[index + 1], newLayout[index]] = [
//         newLayout[index],
//         newLayout[index + 1],
//       ];
//     }
//     setLayoutOrder(newLayout);
//   };

//   const addCustomSection = () => {
//     const newKey = `custom_${Date.now()}`;
//     setLayoutOrder([...layoutOrder, newKey]);
//     setCustomBlocks({
//       ...customBlocks,
//       [newKey]: { title: "New Custom Section", htmlText: "", cards: [] },
//     });
//     setExpandedSection(newKey);
//   };

//   const removeSection = (keyToRemove) => {
//     setLayoutOrder(layoutOrder.filter((key) => key !== keyToRemove));
//     if (expandedSection === keyToRemove) setExpandedSection(null);
//   };

//   const updateSectionTitle = (sectionKey, value) => {
//     setCustomBlocks({
//       ...customBlocks,
//       [sectionKey]: { ...customBlocks[sectionKey], title: value },
//     });
//   };

//   const updateSectionText = (sectionKey, htmlValue) => {
//     setCustomBlocks({
//       ...customBlocks,
//       [sectionKey]: { ...customBlocks[sectionKey], htmlText: htmlValue },
//     });
//   };

//   const addCard = (sectionKey) => {
//     const section = { ...customBlocks[sectionKey] };
//     if (!section.cards) section.cards = [];
//     section.cards.push({
//       title: "New Card",
//       text: "Card content here",
//       align: "left",
//       font: "sans",
//     });
//     setCustomBlocks({ ...customBlocks, [sectionKey]: section });
//   };

//   const updateCard = (sectionKey, cardIndex, field, value) => {
//     const section = { ...customBlocks[sectionKey] };
//     section.cards[cardIndex][field] = value;
//     setCustomBlocks({ ...customBlocks, [sectionKey]: section });
//   };

//   const removeCard = (sectionKey, cardIndex) => {
//     const section = { ...customBlocks[sectionKey] };
//     section.cards.splice(cardIndex, 1);
//     setCustomBlocks({ ...customBlocks, [sectionKey]: section });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     setMessage("");
//     try {
//       await siteContentServices.writeContent({
//         sectionKey: "page_layout",
//         contentValue: JSON.stringify(layoutOrder),
//         contentType: "json",
//       });

//       for (const key of layoutOrder) {
//         if (key.startsWith("custom_") && customBlocks[key]) {
//           await siteContentServices.writeContent({
//             sectionKey: key,
//             contentValue: JSON.stringify(customBlocks[key]),
//             contentType: "json",
//           });
//         }
//       }

//       setMessage("Page structure and custom sections saved successfully!");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (error) {
//       setMessage("Failed to save changes.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center py-20">
//         <div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="w-full px-4 py-8 mx-auto max-w-5xl space-y-8">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Page Builder</h1>
//           <p className="mt-2 text-slate-600">
//             Reorder your sections and build custom card grids.
//           </p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="px-6 py-2.5 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors shadow-md"
//         >
//           {saving ? "Saving..." : "Save All Changes"}
//         </button>
//       </div>

//       {message && (
//         <div
//           className={`p-4 text-sm font-bold rounded-lg ${message.includes("Failed") ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}
//         >
//           {message}
//         </div>
//       )}

//       <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-slate-900">
//             Website Layout Order
//           </h2>
//           <button
//             onClick={addCustomSection}
//             className="px-4 py-2 text-sm font-bold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
//           >
//             + Add Custom Section
//           </button>
//         </div>

//         <div className="space-y-4">
//           {layoutOrder.map((sectionKey, index) => {
//             const isExpanded = expandedSection === sectionKey;
//             const isCustom = sectionKey.startsWith("custom_");
//             const displayName = isCustom
//               ? customBlocks[sectionKey]?.title || "Unnamed Section"
//               : sectionKey.toUpperCase();

//             return (
//               <div
//                 key={sectionKey}
//                 className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${isExpanded ? "border-indigo-400 ring-1 ring-indigo-400" : "border-slate-200 hover:border-slate-300"}`}
//               >
//                 <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-transparent">
//                   <div className="flex items-center gap-4">
//                     <span className="flex items-center justify-center w-8 h-8 font-bold text-slate-500 bg-white rounded-full shadow-sm border border-slate-100">
//                       {index + 1}
//                     </span>
//                     <span className="font-semibold text-slate-800 tracking-wide">
//                       {displayName}
//                     </span>
//                     {isCustom && (
//                       <span className="px-2 py-0.5 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
//                         Custom
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-1">
//                     <button
//                       onClick={() => moveItem(index, "up")}
//                       disabled={index === 0}
//                       className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
//                     >
//                       ↑ Up
//                     </button>
//                     <button
//                       onClick={() => moveItem(index, "down")}
//                       disabled={index === layoutOrder.length - 1}
//                       className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
//                     >
//                       ↓ Down
//                     </button>

//                     {isCustom && (
//                       <>
//                         <button
//                           onClick={() =>
//                             setExpandedSection(isExpanded ? null : sectionKey)
//                           }
//                           className={`px-4 py-1.5 ml-2 text-sm font-bold rounded-lg transition-colors ${isExpanded ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-900 text-white hover:bg-slate-800"}`}
//                         >
//                           {isExpanded ? "Close" : "Edit"}
//                         </button>
//                         <button
//                           onClick={() => removeSection(sectionKey)}
//                           className="p-2 ml-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {isCustom && isExpanded && (
//                   <div className="p-6 bg-white border-t border-slate-100">
//                     <div className="mb-8">
//                       <label className="block mb-2 text-sm font-bold text-slate-700">
//                         Section Title
//                       </label>
//                       <input
//                         type="text"
//                         value={customBlocks[sectionKey]?.title || ""}
//                         onChange={(e) =>
//                           updateSectionTitle(sectionKey, e.target.value)
//                         }
//                         placeholder="e.g. My Services"
//                         className="w-full max-w-md px-3 py-2 text-lg font-semibold text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
//                       />
//                     </div>

//                     <div className="mb-10">
//                       <label className="block mb-2 text-sm font-bold text-slate-700">
//                         Rich Text Area
//                       </label>
//                       <div className="bg-white border rounded-lg border-slate-300 overflow-hidden shadow-sm">
//                         <Editor
//                           apiKey={conf.tinymceApiKey}
//                           value={customBlocks[sectionKey]?.htmlText || ""}
//                           onEditorChange={(content) =>
//                             updateSectionText(sectionKey, content)
//                           }
//                           init={{
//                             height: 350,
//                             menubar: false,
//                             plugins: [
//                               "image",
//                               "advlist",
//                               "autolink",
//                               "lists",
//                               "link",
//                               "charmap",
//                               "preview",
//                               "searchreplace",
//                               "visualblocks",
//                               "code",
//                               "fullscreen",
//                               "media",
//                               "table",
//                               "wordcount",
//                             ],
//                             toolbar:
//                               "undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | code | removeformat",
//                             content_style:
//                               "body { font-family:Helvetica,Arial,sans-serif; font-size:15px }",
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <div className="pt-6 border-t border-slate-200">
//                       <div className="flex items-center justify-between mb-6">
//                         <h3 className="font-bold text-slate-800">
//                           Section Cards
//                         </h3>
//                         <button
//                           onClick={() => addCard(sectionKey)}
//                           className="px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors"
//                         >
//                           + Add Card
//                         </button>
//                       </div>

//                       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                         {customBlocks[sectionKey]?.cards?.map(
//                           (card, cardIndex) => (
//                             <div
//                               key={cardIndex}
//                               className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative group hover:border-slate-300 transition-colors shadow-sm"
//                             >
//                               <button
//                                 onClick={() =>
//                                   removeCard(sectionKey, cardIndex)
//                                 }
//                                 className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
//                               >
//                                 <svg
//                                   className="w-5 h-5"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                                   />
//                                 </svg>
//                               </button>

//                               <input
//                                 type="text"
//                                 value={card.title}
//                                 onChange={(e) =>
//                                   updateCard(
//                                     sectionKey,
//                                     cardIndex,
//                                     "title",
//                                     e.target.value,
//                                   )
//                                 }
//                                 placeholder="Card Title"
//                                 className="w-[85%] px-3 py-2 mb-3 font-bold bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
//                               />
//                               <textarea
//                                 value={card.text}
//                                 onChange={(e) =>
//                                   updateCard(
//                                     sectionKey,
//                                     cardIndex,
//                                     "text",
//                                     e.target.value,
//                                   )
//                                 }
//                                 placeholder="Card description..."
//                                 rows="3"
//                                 className="w-full px-3 py-2 mb-4 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y transition-shadow"
//                               />

//                               <div className="flex gap-4">
//                                 <div className="flex-1">
//                                   <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
//                                     Align
//                                   </label>
//                                   <select
//                                     value={card.align}
//                                     onChange={(e) =>
//                                       updateCard(
//                                         sectionKey,
//                                         cardIndex,
//                                         "align",
//                                         e.target.value,
//                                       )
//                                     }
//                                     className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
//                                   >
//                                     <option value="left">Left</option>
//                                     <option value="center">Center</option>
//                                     <option value="right">Right</option>
//                                   </select>
//                                 </div>
//                                 <div className="flex-1">
//                                   <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
//                                     Font
//                                   </label>
//                                   <select
//                                     value={card.font}
//                                     onChange={(e) =>
//                                       updateCard(
//                                         sectionKey,
//                                         cardIndex,
//                                         "font",
//                                         e.target.value,
//                                       )
//                                     }
//                                     className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
//                                   >
//                                     <option value="sans">Sans (Modern)</option>
//                                     <option value="serif">
//                                       Serif (Classic)
//                                     </option>
//                                     <option value="mono">Mono (Code)</option>
//                                   </select>
//                                 </div>
//                               </div>
//                             </div>
//                           ),
//                         )}
//                         {(!customBlocks[sectionKey]?.cards ||
//                           customBlocks[sectionKey]?.cards.length === 0) && (
//                           <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
//                             <p className="text-slate-500 font-medium">
//                               No cards inside this section yet.
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContentManager;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import siteContentServices from "../Services/site_content.Services.js";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../config/config.js";

function ContentManager() {
  // ----------------------------------------------------------------------
  // BUSINESS LOGIC (Strictly Untouched)
  // ----------------------------------------------------------------------
  const currentUser = useSelector((state) => state.AuthReducer.data);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Upgraded Message to Toast State
  const [toast, setToast] = useState({ type: "", message: "", visible: false });

  const [layoutOrder, setLayoutOrder] = useState([
    "hero",
    "skills",
    "projects",
  ]);
  const [customBlocks, setCustomBlocks] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000);
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const targetUsername =
          currentUser?.username || currentUser?.user?.username;
        if (targetUsername) {
          const res = await siteContentServices.read({ user: targetUsername });

          if (res?.data && Array.isArray(res.data)) {
            let savedLayout = ["hero", "skills", "projects"];
            const blocks = {};

            const layoutItem = res.data.find(
              (item) => item.sectionKey === "page_layout",
            );
            if (layoutItem) {
              try {
                savedLayout = JSON.parse(layoutItem.contentValue);
              } catch (e) {
                console.error("Layout parse error", e);
              }
            }

            res.data.forEach((item) => {
              if (item.sectionKey.startsWith("custom_")) {
                try {
                  let sanitized = item.contentValue
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
                    parsed = JSON.parse(parsed);
                    attempt++;
                  }

                  blocks[item.sectionKey] = parsed;
                } catch (e) {
                  blocks[item.sectionKey] = {
                    title: "Recovered Section",
                    htmlText: item.contentValue,
                    cards: [],
                  };
                }
              }
            });

            setLayoutOrder(savedLayout);
            setCustomBlocks(blocks);
          }
        }
      } catch (error) {
        console.error("Failed to load content manager data", error);
        showToast("error", "Failed to load builder data.");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [currentUser]);

  const moveItem = (index, direction) => {
    const newLayout = [...layoutOrder];
    if (direction === "up" && index > 0) {
      [newLayout[index - 1], newLayout[index]] = [
        newLayout[index],
        newLayout[index - 1],
      ];
    } else if (direction === "down" && index < newLayout.length - 1) {
      [newLayout[index + 1], newLayout[index]] = [
        newLayout[index],
        newLayout[index + 1],
      ];
    }
    setLayoutOrder(newLayout);
  };

  const addCustomSection = () => {
    const newKey = `custom_${Date.now()}`;
    setLayoutOrder([...layoutOrder, newKey]);
    setCustomBlocks({
      ...customBlocks,
      [newKey]: { title: "New Custom Section", htmlText: "", cards: [] },
    });
    setExpandedSection(newKey);
  };

  const removeSection = (keyToRemove) => {
    setLayoutOrder(layoutOrder.filter((key) => key !== keyToRemove));
    if (expandedSection === keyToRemove) setExpandedSection(null);
  };

  const updateSectionTitle = (sectionKey, value) => {
    setCustomBlocks({
      ...customBlocks,
      [sectionKey]: { ...customBlocks[sectionKey], title: value },
    });
  };

  const updateSectionText = (sectionKey, htmlValue) => {
    setCustomBlocks({
      ...customBlocks,
      [sectionKey]: { ...customBlocks[sectionKey], htmlText: htmlValue },
    });
  };

  const addCard = (sectionKey) => {
    const section = { ...customBlocks[sectionKey] };
    if (!section.cards) section.cards = [];
    section.cards.push({
      title: "New Card",
      text: "Card content here",
      align: "left",
      font: "sans",
    });
    setCustomBlocks({ ...customBlocks, [sectionKey]: section });
  };

  const updateCard = (sectionKey, cardIndex, field, value) => {
    const section = { ...customBlocks[sectionKey] };
    section.cards[cardIndex][field] = value;
    setCustomBlocks({ ...customBlocks, [sectionKey]: section });
  };

  const removeCard = (sectionKey, cardIndex) => {
    const section = { ...customBlocks[sectionKey] };
    section.cards.splice(cardIndex, 1);
    setCustomBlocks({ ...customBlocks, [sectionKey]: section });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await siteContentServices.writeContent({
        sectionKey: "page_layout",
        contentValue: JSON.stringify(layoutOrder),
        contentType: "json",
      });

      for (const key of layoutOrder) {
        if (key.startsWith("custom_") && customBlocks[key]) {
          await siteContentServices.writeContent({
            sectionKey: key,
            contentValue: JSON.stringify(customBlocks[key]),
            contentType: "json",
          });
        }
      }

      showToast("success", "Architecture Matrix synchronized successfully!");
    } catch (error) {
      showToast("error", "System failure: Cannot sync matrix.");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------------------------
  // PSYCH-UI: Dynamic Component Classes
  // ----------------------------------------------------------------------
  const inputClass = "w-full px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-50 bg-slate-50/80 dark:bg-[#0a0a0c]/50 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:bg-white dark:focus:bg-[#040405] focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600";

  // ----------------------------------------------------------------------
  // PSYCH-UI RENDER
  // ----------------------------------------------------------------------

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-transparent text-primary-600 dark:text-primary-400 font-black tracking-widest uppercase text-[10px] sm:text-xs transition-colors duration-500">
        <div className="relative flex items-center justify-center w-12 h-12 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-20 animate-ping"></div>
          <svg className="w-8 h-8 animate-spin text-primary-500 opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        Loading Architecture Matrix...
      </div>
    );

  return (
    <div className="relative w-full px-4 pt-12 pb-24 mx-auto max-w-5xl animate-[slideDown_0.4s_ease-out] isolate">
      
      {/* Custom Toast Notification System */}
      <div className={`fixed top-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
        {toast.message && (
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
            toast.type === "error" ? "bg-red-500/90 border-red-400 text-white" : 
            "bg-emerald-500/90 border-emerald-400 text-white"
          }`}>
            {toast.type === "success" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>}
            {toast.type === "error" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>}
            <span className="text-sm font-bold tracking-wide">{toast.message}</span>
          </div>
        )}
      </div>

      {/* Header Bar */}
      <div className="flex flex-col items-start justify-between gap-6 mb-10 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
              Core Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Page Builder Matrix
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-lg mt-2">
            Reorder root system modules and deploy custom multi-card grids.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center w-full md:w-auto px-8 py-3.5 text-xs font-black tracking-widest uppercase text-white bg-primary-500 hover:bg-primary-600 rounded-2xl shadow-[0_0_20px_var(--theme-primary-glow)] hover:shadow-[0_0_30px_var(--theme-primary-glow)] transform-gpu hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed gpu-layer"
        >
          {saving ? (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
              Synchronizing...
            </span>
          ) : (
            "Save Architecture"
          )}
        </button>
      </div>

      {/* Builder Console */}
      <div className="p-4 sm:p-8 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer">
        
        {/* Module Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800/80">
          <h2 className="text-[13px] font-black tracking-widest text-slate-700 dark:text-slate-300 uppercase">
            Frontend Layout Sequence
          </h2>
          <button
            onClick={addCustomSection}
            className="flex items-center justify-center px-5 py-2.5 text-[10px] font-black tracking-widest uppercase text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-xl transition-all duration-300 transform-gpu hover:scale-105"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            Deploy Custom Module
          </button>
        </div>

        {/* The Reorderable List */}
        <div className="space-y-4">
          {layoutOrder.map((sectionKey, index) => {
            const isExpanded = expandedSection === sectionKey;
            const isCustom = sectionKey.startsWith("custom_");
            const displayName = isCustom
              ? customBlocks[sectionKey]?.title || "Unnamed Module"
              : sectionKey.toUpperCase();

            return (
              <div
                key={sectionKey}
                className={`flex flex-col bg-white dark:bg-[#0a0a0c] border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 gpu-layer ${
                  isExpanded 
                    ? "border-primary-500/50 shadow-[0_0_30px_-5px_var(--theme-primary-glow)]" 
                    : "border-slate-200 dark:border-slate-800 hover:border-primary-500/30 dark:hover:border-primary-500/30 hover:-translate-y-0.5"
                }`}
              >
{/* Drag Row Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5">
                  
                  {/* Left: Identity (Mobile Truncated) */}
                  <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                    <span className="flex items-center justify-center w-8 h-8 shrink-0 text-[11px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner">
                      0{index + 1}
                    </span>
                    <div className="flex flex-col overflow-hidden w-full">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-slate-50 tracking-wide uppercase truncate">
                        {displayName}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5 truncate">
                        {isCustom ? "Custom Grid Module" : "Root System Component"}
                      </span>
                    </div>
                  </div>

                  {/* Right: Controls (Mobile Wrapped) */}
                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-100 dark:border-slate-800/50 sm:border-0">
                    
                    {/* Directional Arrows (Interactive Physics) */}
                    <div className="flex bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => moveItem(index, "up")}
                        disabled={index === 0}
                        className="p-2 text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        title="Move Up"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
                      </button>
                      <div className="w-px bg-slate-200 dark:bg-slate-800" />
                      <button
                        onClick={() => moveItem(index, "down")}
                        disabled={index === layoutOrder.length - 1}
                        className="p-2 text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        title="Move Down"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                    </div>

                    {/* Edit / Delete Buttons */}
                    {isCustom ? (
                      <>
                        <button
                          onClick={() => setExpandedSection(isExpanded ? null : sectionKey)}
                          className={`px-4 py-2 ml-1 text-[10px] font-black tracking-widest uppercase rounded-lg transition-all duration-300 transform-gpu hover:scale-105 ${
                            isExpanded 
                              ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md" 
                              : "bg-primary-500 text-white hover:bg-primary-600 shadow-md"
                          }`}
                        >
                          {isExpanded ? "Close" : "Configure"}
                        </button>
                        <button
                          onClick={() => removeSection(sectionKey)}
                          className="p-2 text-slate-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Module"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center p-2 text-slate-300 dark:text-slate-600 ml-1">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" title="Root module cannot be configured or deleted"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* The Expanded Dossier Editor */}
                {isCustom && isExpanded && (
                  <div className="p-5 sm:p-8 bg-slate-50 dark:bg-[#060608] border-t border-slate-200 dark:border-slate-800 animate-[slideDown_0.3s_ease-out]">
                    
                    {/* Title Input */}
                    <div className="mb-8 relative group">
                      <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">Module Designation</label>
                      <input
                        type="text"
                        value={customBlocks[sectionKey]?.title || ""}
                        onChange={(e) => updateSectionTitle(sectionKey, e.target.value)}
                        placeholder="e.g. My Services"
                        className={inputClass}
                      />
                    </div>

                   {/* TinyMCE Editor - Wrapped to protect dark mode contrast */}
                    {/* <div className="mb-10 w-full overflow-hidden">
                      <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">Rich Text Data Payload</label>
                      <div className="p-1 bg-slate-200 dark:bg-slate-300 rounded-xl overflow-x-auto shadow-inner w-full">
                        <Editor
                          apiKey={conf.tinymceApiKey}
                          value={customBlocks[sectionKey]?.htmlText || ""}
                          onEditorChange={(content) => updateSectionText(sectionKey, content)}
                          init={{
                            height: 350,
                            menubar: false,
                            plugins: ["image", "advlist", "autolink", "lists", "link", "charmap", "preview", "searchreplace", "visualblocks", "code", "fullscreen", "media", "table", "wordcount"],
                            toolbar: "undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | code | removeformat",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:15px }",
                          }}
                        />
                      </div>
                    </div> */}

                    {/* TinyMCE Editor - Wrapped to protect dark mode contrast */}
                    <div className="mb-10 w-full overflow-hidden">
                      <label className="block text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">Rich Text Data Payload</label>
                      <div className="p-1 bg-slate-200 dark:bg-[#0a0a0c] border border-transparent dark:border-slate-800 rounded-xl overflow-x-auto shadow-inner w-full">
                        <Editor
                          apiKey={conf.tinymceApiKey}
                          value={customBlocks[sectionKey]?.htmlText || ""}
                          onEditorChange={(content) => updateSectionText(sectionKey, content)}
                          init={{
                            height: 350,
                            menubar: false,
                            // PSYCH-UI Fix: Activate TinyMCE Native Dark Mode
                            skin: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oxide-dark' : 'oxide',
                            content_css: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'default',
                            plugins: ["image", "advlist", "autolink", "lists", "link", "charmap", "preview", "searchreplace", "visualblocks", "code", "fullscreen", "media", "table", "wordcount"],
                            toolbar: "undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | code | removeformat",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:15px; background-color:transparent; }",
                          }}
                        />
                      </div>
                    </div>

                    {/* Card Grid System */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                          Sub-Module Cards
                        </h3>
                        <button
                          onClick={() => addCard(sectionKey)}
                          className="px-4 py-2 text-[10px] font-black tracking-widest text-slate-700 dark:text-slate-300 uppercase bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary-500/50 hover:text-primary-500 transition-all shadow-sm"
                        >
                          + Append Card
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {customBlocks[sectionKey]?.cards?.map((card, cardIndex) => (
                          <div
                            key={cardIndex}
                            className="relative p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0a0a0c] shadow-sm hover:border-primary-500/30 transition-colors group/card"
                          >
                            <button
                              onClick={() => removeCard(sectionKey, cardIndex)}
                              className="absolute top-4 right-4 p-2 text-slate-400 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete Card"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>

                            <div className="space-y-4 pr-8">
                              <input
                                type="text"
                                value={card.title}
                                onChange={(e) => updateCard(sectionKey, cardIndex, "title", e.target.value)}
                                placeholder="Card Title"
                                className="w-full px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-slate-50 bg-slate-50/50 dark:bg-[#040405] border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                              />
                              <textarea
                                value={card.text}
                                onChange={(e) => updateCard(sectionKey, cardIndex, "text", e.target.value)}
                                placeholder="Card payload description..."
                                rows="3"
                                className="w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-[#040405] border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-y placeholder:text-slate-400 dark:placeholder:text-slate-600"
                              />

                              <div className="flex gap-4 pt-2">
                                <div className="flex-1">
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Alignment</label>
                                  <select
                                    value={card.align}
                                    onChange={(e) => updateCard(sectionKey, cardIndex, "align", e.target.value)}
                                    className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="left">Left Align</option>
                                    <option value="center">Center Align</option>
                                    <option value="right">Right Align</option>
                                  </select>
                                </div>
                                <div className="flex-1">
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Typography</label>
                                  <select
                                    value={card.font}
                                    onChange={(e) => updateCard(sectionKey, cardIndex, "font", e.target.value)}
                                    className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="sans">Sans (Modern)</option>
                                    <option value="serif">Serif (Classic)</option>
                                    <option value="mono">Mono (Code)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {(!customBlocks[sectionKey]?.cards || customBlocks[sectionKey]?.cards.length === 0) && (
                          <div className="col-span-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20">
                            <svg className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Sub-module grid is empty</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ContentManager;
