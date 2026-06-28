import React from 'react'
import adminServices from '../Services/admin_users.Services.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { login } from '../store/AuthSlice.js'

function Login() {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

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
                navigate('/');
            }
        } catch (error) {
            setError(error.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
            
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={loginHandler} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Fixed casing
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter username"
                    />
                </div>
                
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Fixed casing
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Authenticating..." : "Login"} 
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login