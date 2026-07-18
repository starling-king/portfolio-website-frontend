import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminServices from '../Services/admin_users.Services.js';
import { Container, Button } from './index.js'; 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/AuthSlice.js';

function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    const dispatch = useDispatch(); 
    const authStatus = useSelector((state) => state.AuthReducer.status);
    
   
    const [showPassword, setShowPassword] = useState(false); 

    const navigate = useNavigate();

//    useEffect(() => {
//         if (authStatus) {
//             navigate('/admin/dashboard', { replace: true });
//         } else {
//             // Silently check the backend for a valid HttpOnly cookie
//             adminServices.getCurrentUser()
//                 .then((userData) => {
//                     if (userData) {
//                         dispatch(login({ data: userData }));
//                         navigate('/admin/dashboard', { replace: true });
//                     } else {
//                         setIsCheckingSession(false);
//                     }
//                 })
//                 .catch(() => {
//                     setIsCheckingSession(false);
//                 });
//         }
//     }, [authStatus, navigate, dispatch]);

    useEffect(() => {
        if (authStatus) {
            navigate('/admin/dashboard', { replace: true });
        } else {
            // Silently check the backend for a valid HttpOnly cookie
            adminServices.getCurrentUser()
                .then((userData) => {
                    if (userData) {
                        dispatch(login({ data: userData }));
                        navigate('/admin/dashboard', { replace: true });
                    } else {
                        setIsCheckingSession(false);
                    }
                })
                .catch(() => {
                    setIsCheckingSession(false);
                });
        }
    }, [authStatus, navigate, dispatch]);

    const registerHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await adminServices.registerUser({ name, password, email });

            if (response && response.data) {
               
                setSuccess(true);
            }
        } catch (error) {
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isCheckingSession) {
        return (
            <div className="flex items-center justify-center min-h-[75vh] text-indigo-600 font-medium tracking-wide">
                <svg className="w-6 h-6 mr-3 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying secure session...
            </div>
        );
    }
   
    if (success) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center w-full mx-auto">
                    <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-green-600 bg-green-100 rounded-xl shadow-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Registration Successful</h2>
                        <p className="mt-2 text-slate-600">Your admin credentials are ready.</p>
                        
                        <Button 
                            onClick={() => navigate('/login',{ replace: true })} 
                            bgcolor="" 
                            textColor=""
                            className="mt-6 w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                        >
                            Proceed to Login
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }

    // --- REGISTRATION FORM UI ---
    return (
        <Container>
            {/* Added w-full and mx-auto to guarantee the card centers perfectly on wide screens */}
            <div className="flex items-center justify-center min-h-[75vh] px-4 py-12 w-full mx-auto">
                <div className="w-full max-w-md p-6 space-y-8 bg-white border sm:p-10 border-slate-200 rounded-2xl shadow-sm">
                    
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-white bg-indigo-600 rounded-xl shadow-sm">
                            <span className="font-mono text-xl font-bold">{">_"}</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Initialize Admin</h2>
                        <p className="mt-2 text-sm text-slate-500">Create the master administrative account.</p>
                    </div>
                    
                    {error && (
                        <div className="p-4 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={registerHandler} className="space-y-5">
                        {/* Username Field */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">Username</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="Choose a username"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="admin@ayushdev.online"
                            />
                        </div>
                        
                        {/* Password Field with Eye Icon */}
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 pr-12 text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-indigo-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Overriding default Button colors to strictly enforce the theme */}
                        <Button 
                            type="submit" 
                            disabled={loading} 
                            bgcolor=""
                            textColor=""
                            className="w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </Button>
                    </form>
                    
                    <div className="pt-2 text-sm text-center text-slate-500">
                        Already initialized?{' '}
                        <Link to="/login" replace className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                            Log in here.
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Signin;