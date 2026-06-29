import React, { useState, useEffect } from 'react';

export default function ServerWakeupBanner() {
    const [isWaking, setIsWaking] = useState(false);

    useEffect(() => {
        const handleWaking = () => setIsWaking(true);
        const handleAwake = () => setIsWaking(false);


        window.addEventListener('server-waking', handleWaking);
        window.addEventListener('server-awake', handleAwake);

        return () => {
            window.removeEventListener('server-waking', handleWaking);
            window.removeEventListener('server-awake', handleAwake);
        };
    }, []);

    if (!isWaking) return null;

    return (
        <div className="w-full bg-indigo-50 border-b border-indigo-100 px-4 py-3 text-indigo-800 flex items-center justify-center text-sm font-medium shadow-inner">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>
                Our server spins down after 15 minutes of inactivity. Please wait a moment while it wakes up...
            </span>
        </div>
    );
}