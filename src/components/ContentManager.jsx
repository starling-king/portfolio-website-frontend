import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import siteContentServices from '../Services/site_content.Services.js';
import { Editor } from '@tinymce/tinymce-react'; // The Chai aur Code Editor

function ContentManager() {
    const authData = useSelector((state) => state.AuthReducer.data);
    const currentUser = authData?.user;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [layoutOrder, setLayoutOrder] = useState(['hero', 'skills', 'projects']);
    const [customBlocks, setCustomBlocks] = useState({});

    // useEffect(() => {
    //     const loadContent = async () => {
    //         try {
    //             if (currentUser?.username) {
    //                 const res = await siteContentServices.read({ user: currentUser.username });
    //                 if (res?.data && Array.isArray(res.data)) {
    //                     const blocks = {};
    //                     res.data.forEach(item => {
    //                         if (item.sectionKey === 'page_layout') {
    //                             setLayoutOrder(JSON.parse(item.contentValue));
    //                         } else if (item.sectionKey.startsWith('custom_')) {
    //                             blocks[item.sectionKey] = JSON.parse(item.contentValue);
    //                         }
    //                     });
    //                     setCustomBlocks(blocks);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Failed to load content manager data", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     loadContent();
    // }, [currentUser?.username]);

    useEffect(() => {
        const loadContent = async () => {
            try {
                if (currentUser?.username) {
                    const res = await siteContentServices.read({ user: currentUser.username });
                    
                    if (res?.data && Array.isArray(res.data)) {
                        let savedLayout = ['hero', 'skills', 'projects']; // Default
                        const blocks = {};

                        // 1. First, find the layout
                        const layoutItem = res.data.find(item => item.sectionKey === 'page_layout');
                        if (layoutItem) {
                            savedLayout = JSON.parse(layoutItem.contentValue);
                        }

                        // 2. Extract all custom blocks
                        res.data.forEach(item => {
                            if (item.sectionKey.startsWith('custom_')) {
                                blocks[item.sectionKey] = JSON.parse(item.contentValue);
                                
                                // THE FIX: If the custom block exists but isn't in the layout, add it!
                                if (!savedLayout.includes(item.sectionKey)) {
                                    savedLayout.push(item.sectionKey);
                                }
                            }
                        });

                        setLayoutOrder(savedLayout);
                        setCustomBlocks(blocks);
                    }
                }
            } catch (error) {
                console.error("Failed to load content manager data", error);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, [currentUser?.username]);

    const moveItem = (index, direction) => {
        const newLayout = [...layoutOrder];
        if (direction === 'up' && index > 0) {
            [newLayout[index - 1], newLayout[index]] = [newLayout[index], newLayout[index - 1]];
        } else if (direction === 'down' && index < newLayout.length - 1) {
            [newLayout[index + 1], newLayout[index]] = [newLayout[index], newLayout[index + 1]];
        }
        setLayoutOrder(newLayout);
    };

    const addCustomSection = () => {
        const newKey = `custom_${Date.now()}`;
        setLayoutOrder([...layoutOrder, newKey]);
        setCustomBlocks({
            ...customBlocks,
            [newKey]: { title: 'New Custom Section', htmlText: '', cards: [] } 
        });
    };

    const removeSection = (keyToRemove) => {
        setLayoutOrder(layoutOrder.filter(key => key !== keyToRemove));
    };

    const updateSectionTitle = (sectionKey, value) => {
        setCustomBlocks({ ...customBlocks, [sectionKey]: { ...customBlocks[sectionKey], title: value } });
    };

    const updateSectionText = (sectionKey, htmlValue) => {
        setCustomBlocks({ ...customBlocks, [sectionKey]: { ...customBlocks[sectionKey], htmlText: htmlValue } });
    };

    const addCard = (sectionKey) => {
        const section = { ...customBlocks[sectionKey] };
        if (!section.cards) section.cards = [];
        section.cards.push({ title: 'New Card', text: 'Card content here', align: 'left', font: 'sans' });
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
        setMessage('');
        try {
            const promises = [];

            promises.push(siteContentServices.writeContent({
                sectionKey: 'page_layout',
                contentValue: JSON.stringify(layoutOrder),
                contentType: 'json'
            }));

            Object.keys(customBlocks).forEach(key => {
                if (layoutOrder.includes(key)) {
                    promises.push(siteContentServices.writeContent({
                        sectionKey: key,
                        contentValue: JSON.stringify(customBlocks[key]),
                        contentType: 'json'
                    }));
                }
            });

            await Promise.all(promises);
            setMessage('Page structure and custom sections saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>;

    return (
        <div className="w-full px-4 py-8 mx-auto max-w-5xl space-y-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Page Builder</h1>
                    <p className="mt-2 text-slate-600">Reorder your sections and build custom card grids.</p>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="px-6 py-2.5 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors"
                >
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {message && (
                <div className={`p-4 text-sm font-bold rounded-lg ${message.includes('Failed') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                    {message}
                </div>
            )}

            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Website Layout Order</h2>
                    <button onClick={addCustomSection} className="px-4 py-2 text-sm font-bold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                        + Add Custom Section
                    </button>
                </div>
                
                <div className="space-y-3">
                    {layoutOrder.map((sectionKey, index) => (
                        <div key={sectionKey} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 font-bold text-slate-500 bg-white rounded-full shadow-sm">
                                    {index + 1}
                                </span>
                                <span className="font-semibold text-slate-800 uppercase tracking-wider">
                                    {sectionKey.replace(/_/g, ' ')}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-2 text-slate-500 hover:text-indigo-600 disabled:opacity-30">↑ Up</button>
                                <button onClick={() => moveItem(index, 'down')} disabled={index === layoutOrder.length - 1} className="p-2 text-slate-500 hover:text-indigo-600 disabled:opacity-30">↓ Down</button>
                                {sectionKey.startsWith('custom_') && (
                                    <button onClick={() => removeSection(sectionKey)} className="p-2 ml-4 text-red-500 hover:text-red-700">Remove</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {layoutOrder.filter(key => key.startsWith('custom_')).map((sectionKey) => (
                <div key={sectionKey} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm border-t-4 border-t-indigo-500">
                    
                    <div className="flex items-center justify-between mb-8">
                        <input 
                            type="text" 
                            value={customBlocks[sectionKey]?.title || ''}
                            onChange={(e) => updateSectionTitle(sectionKey, e.target.value)}
                            placeholder="Section Title (e.g. My Services)"
                            className="text-2xl font-bold text-slate-900 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-indigo-500 outline-none px-2 py-1 w-full max-w-md transition-colors"
                        />
                    </div>

                    {/* TINYMCE EDITOR INTEGRATION */}
                    <div className="mb-10">
                        <label className="block mb-2 text-sm font-bold text-slate-700">Rich Text Area (Optional)</label>
                        <div className="bg-white border rounded-lg border-slate-300 overflow-hidden">
                            <Editor
                                apiKey={import.meta.env.VITE_TINYMCE_API_KEY }// Hitesh usually tells students to get a free key from tiny.cloud and put it here
                                value={customBlocks[sectionKey]?.htmlText || ''}
                                onEditorChange={(content) => updateSectionText(sectionKey, content)}
                                init={{
                                    height: 300,
                                    menubar: true,
                                    plugins: [
                                        "image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                                        "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table",
                                        "code", "help", "wordcount", "anchor",
                                    ],
                                    toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                                }}
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-800">Section Cards (Optional)</h3>
                            <button onClick={() => addCard(sectionKey)} className="px-4 py-2 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800">
                                + Add Card
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {customBlocks[sectionKey]?.cards?.map((card, cardIndex) => (
                                <div key={cardIndex} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative group">
                                    <button onClick={() => removeCard(sectionKey, cardIndex)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                    
                                    <input 
                                        type="text" value={card.title} onChange={(e) => updateCard(sectionKey, cardIndex, 'title', e.target.value)}
                                        placeholder="Card Title" className="w-[85%] px-3 py-2 mb-3 font-bold border border-slate-300 rounded-md outline-none focus:border-indigo-500"
                                    />
                                    
                                    <textarea 
                                        value={card.text} onChange={(e) => updateCard(sectionKey, cardIndex, 'text', e.target.value)}
                                        placeholder="Card text..." rows="3" className="w-full px-3 py-2 mb-3 border border-slate-300 rounded-md outline-none focus:border-indigo-500 resize-y"
                                    />
                                    
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Alignment</label>
                                            <select value={card.align} onChange={(e) => updateCard(sectionKey, cardIndex, 'align', e.target.value)} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-md outline-none focus:border-indigo-500">
                                                <option value="left">Left</option>
                                                <option value="center">Center</option>
                                                <option value="right">Right</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Font Style</label>
                                            <select value={card.font} onChange={(e) => updateCard(sectionKey, cardIndex, 'font', e.target.value)} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-md outline-none focus:border-indigo-500">
                                                <option value="sans">Sans (Modern)</option>
                                                <option value="serif">Serif (Classic)</option>
                                                <option value="mono">Mono (Code)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(!customBlocks[sectionKey]?.cards || customBlocks[sectionKey]?.cards.length === 0) && (
                                <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-300 rounded-xl">
                                    <p className="text-slate-500">No cards added. This section will just display the rich text above.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContentManager;