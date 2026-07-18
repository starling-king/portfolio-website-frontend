import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import adminServices from '../Services/admin_users.Services.js';
import { login } from '../store/AuthSlice.js';
import { Container, Button } from './index.js';

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const loginHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await adminServices.login({ name, password });

            if (response && response.data) {
                dispatch(login({ data: response.data }));
            }
        } catch (error) {
            setError(error.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    const authStatus = useSelector((state) => state.AuthReducer.status);

    useEffect(() => {
    if (authStatus && !loading) {
        navigate('/admin/dashboard', { replace: true }); 
    }
}, [authStatus, navigate,loading]);


  return (
    <Container>
        {/* Responsive wrapper: centers the card and ensures padding on mobile */}
        <div className="flex items-center justify-center min-h-[75vh] px-4 py-12">
            <div className="w-full max-w-md p-6 space-y-8 bg-white border sm:p-10 border-slate-200 rounded-2xl shadow-sm">
                
                {/* Header Section */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-white bg-indigo-600 rounded-xl shadow-sm">
                        <span className="font-mono text-xl font-bold">{">_"}</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">System Access</h2>
                    <p className="mt-2 text-sm text-slate-500">Authenticate to enter the command center.</p>
                </div>
                
                {/* Error Banner */}
                {error && (
                    <div className="p-4 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Form Section */}
                <form onSubmit={loginHandler} className="space-y-5">
                    <div>
                        <label className="block mb-1.5 text-sm font-semibold text-slate-700">Username</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Enter username"
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1.5 text-sm font-semibold text-slate-700">Password</label>
                        <div className="relative">
                            <input 
                                // Toggle between password and text type based on state
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 pr-12 text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="••••••••"
                            />
                            {/* The Eye Icon Button */}
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

                    <Button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? "Authenticating..." : "Secure Login"} 
                    </Button>
                </form>

                {/* Integration with your Signin component */}
                <div className="pt-2 text-sm text-center text-slate-500">
                    Need administrative access?{' '}
                    <Link to="/signin" replace className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                        Register here.
                    </Link>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Login;