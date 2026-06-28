import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import adminServices from '../Services/admin_users.Services.js'

function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await adminServices.registerUser({ name, password, email });

            if (response && response.data) {
                alert("Registration successful! Please log in with your new credentials.");
                navigate('/login');
            }
        } catch (error) {
            setError(error.message || "Registration failed. Please check your details and try again.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Register Admin</h2>
            
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={registerHandler} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Choose a username"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Create a password"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Sign Up"}
                </button>
                
                <div className="text-sm text-center text-gray-600">
                    Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">Log in here</span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signin