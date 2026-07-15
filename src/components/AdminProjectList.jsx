import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminProjects } from '../store/ProjectSlice'; 
import projectServices from '../Services/projects.Services';

function AdminProjectList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // 1. Pull the master list directly from Redux
    const projects = useSelector((state) => state.ProjectReducer.adminProjects);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminProjects = async () => {
            setLoading(true);
            try {
                // Uses the exact signature from your service
                const response = await projectServices.getAllAdminProjects({}); 
                // Store globally in Redux
                if (response?.data) {
                    dispatch(setAdminProjects(response.data));
                }
            } catch (err) {
                setError('Failed to load projects. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminProjects();
    }, [dispatch]);

    // 2. Delete Logic mapping to Redux
    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project permanently?");
        if (!confirmDelete) return;

        try {
            // Uses the { id } signature from your service
            await projectServices.deleteProject({ id: projectId });
            
            // Filter the deleted project out and update Redux instantly
            const updatedProjects = projects.filter(project => project._id !== projectId);
            dispatch(setAdminProjects(updatedProjects));
        } catch (err) {
            alert("Failed to delete project.");
        }
    };

    // 3. Toggle Logic mapping to Redux
    const handleToggleStatus = async (projectId, field, currentValue) => {
        try {
            const updatedData = { [field]: !currentValue };
            
            // Note: See "Critical Fix" below regarding this service call
            await projectServices.updateProject({ id: projectId, ...updatedData });
            
            // Update Redux state instantly
            const updatedProjects = projects.map(project => 
                project._id === projectId ? { ...project, [field]: !currentValue } : project
            );
            dispatch(setAdminProjects(updatedProjects));
        } catch (err) {
            alert(`Failed to update ${field} status.`);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>;

    return (
        <div className="w-full px-4 py-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">All Projects</h1>
                    <p className="mt-2 text-slate-600">Manage your portfolio items, toggle visibility, and assign featured status.</p>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/projects/new')}
                    className="flex items-center px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                    Add New Project
                </button>
            </div>

            {error && <div className="p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-lg">{error}</div>}

            <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-bold tracking-wider text-slate-600 uppercase">Project</th>
                            <th className="px-6 py-4 text-sm font-bold tracking-wider text-slate-600 uppercase">Status</th>
                            <th className="px-6 py-4 text-sm font-bold tracking-wider text-slate-600 uppercase">Featured</th>
                            <th className="px-6 py-4 text-sm font-bold tracking-wider text-slate-600 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {projects.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No projects found.</td></tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{project.title}</p>
                                        <p className="text-sm text-slate-500">/{project.slug}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleToggleStatus(project._id, 'isPublished', project.isPublished)}
                                            className={`px-3 py-1 text-xs font-bold rounded-full border transition-colors ${
                                                project.isPublished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            }`}
                                        >
                                            {project.isPublished ? 'Published' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleToggleStatus(project._id, 'isFeatured', project.isFeatured)}
                                            className={`p-2 rounded-full transition-colors ${project.isFeatured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-slate-300 hover:bg-slate-100'}`}
                                        >
                                            <svg className="w-6 h-6" fill={project.isFeatured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button onClick={() => navigate(`/dashboard/projects/edit/${project._id}`)} className="font-medium text-indigo-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(project._id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProjectList;