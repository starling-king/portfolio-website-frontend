import React, { useEffect, useState } from 'react';
import contactMessageService from '../Services/contact_messages.Services';

function AdminInbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                
                const response = await contactMessageService.DiscoverMessage({});
                
                
                const newMessages = response?.data?.updatedStatus?.filtered || [];
                setMessages(newMessages);
            } catch (err) {
                
                if (err?.response?.status === 404 || err?.message?.includes("404")) {
                    setMessages([]);
                } else {
                    setError('Failed to load messages. Please check your connection.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>;

    return (
        <div className="w-full px-4 py-8 mx-auto max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Inbox</h1>
                <p className="mt-2 text-slate-600">Review your new contact messages. Messages are automatically marked as read upon discovery.</p>
            </div>

            {error && <div className="p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-lg">{error}</div>}

            {messages.length === 0 && !error ? (
                <div className="p-12 text-center border-2 border-dashed rounded-xl border-slate-300 bg-slate-50">
                    <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-lg font-bold text-slate-700">Inbox Zero</h3>
                    <p className="mt-1 text-slate-500">You have no new messages to review.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {messages.map((msg) => (
                        <div key={msg._id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{msg.name}</h3>
                                    <a href={`mailto:${msg.email}`} className="text-sm font-medium text-indigo-600 hover:underline">
                                        {msg.email}
                                    </a>
                                </div>
                                <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-full">
                                    New
                                </span>
                            </div>
                            <div className="p-4 mt-4 text-slate-700 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="whitespace-pre-wrap">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminInbox;