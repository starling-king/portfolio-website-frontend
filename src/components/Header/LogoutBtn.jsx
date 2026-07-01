import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import adminServices from '../../Services/admin_users.Services.js';
import { logout } from '../../store/AuthSlice.js';

function LogoutBtn() {
    const dispatch = useDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logoutHandler = async () => {
        setIsLoggingOut(true);
        try {
            await adminServices.logoutUser();
        }catch (error) {
            console.log("Backend session already cleared or unavailable.");
        } finally {
            dispatch(logout());
        }
    };

    return (
        <button 
            onClick={logoutHandler}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 transition-all duration-200 rounded hover:text-red-400 hover:bg-slate-800 disabled:opacity-50"
            title="Terminate Session"
        >
            {isLoggingOut ? (
                <span className="animate-pulse">Exiting...</span>
            ) : (
                <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {/* Hides the word "Logout" on tiny screens to save space, showing only the icon */}
                    <span className="hidden sm:inline">Logout</span>
                </>
            )}
        </button>
    );
}

export default LogoutBtn;