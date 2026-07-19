import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import adminServices from '../Services/admin_users.Services.js';
import siteContentServices from '../Services/site_content.Services.js';
import { login } from '../store/AuthSlice.js'; 

function ProfileSettings() {
    const dispatch = useDispatch();
    
    // Pull current auth data from Redux
    const authData = useSelector((state) => state.AuthReducer.data);
    const currentUser = authData?.user;

    // --- STATE: Admin Account Details ---
    const [adminForm, setAdminForm] = useState({
        username: currentUser?.username || '',
        email: currentUser?.email || ''
    });
    const [adminStatus, setAdminStatus] = useState({ loading: false, error: '', success: '' });

    // --- STATE: Public Portfolio (Site Content) ---
    const [portfolioForm, setPortfolioForm] = useState({
        name: '',
        role: '',
        aboutText: '',
        profilePhotoUrl: ''
    });
    const [portfolioStatus, setPortfolioStatus] = useState({ loading: false, error: '', success: '' });
    const [initialFetchLoading, setInitialFetchLoading] = useState(true);

    // --- STATE: Security (Change Password) ---
    const [passwordForm, setPasswordForm] = useState({ oldpassword: '', newpassword: '' });
    const [passwordStatus, setPasswordStatus] = useState({ loading: false, error: '', success: '' });
    const [showPasswords, setShowPasswords] = useState(false);



    // --- 1. FETCH PUBLIC PORTFOLIO DATA ON MOUNT ---
    useEffect(() => {
        const loadSiteContent = async () => {
            try {
                if (currentUser?.username) {
                    const res = await siteContentServices.read({ user: currentUser.username });
                    if (res?.data && Array.isArray(res.data)) {
                        const contentObj = {};
                        res.data.forEach(item => {
                            contentObj[item.sectionKey] = item.contentValue;
                        });
                        
                        setPortfolioForm({
                            name: contentObj.name || '',
                            role: contentObj.role || '',
                            aboutText: contentObj.aboutText || '',
                            profilePhotoUrl: contentObj.profilePhotoUrl || ''
                        });
                    }
                }
            } catch (error) {
                console.error("Failed to fetch public profile data:", error);
            } finally {
                setInitialFetchLoading(false);
            }
        };
        loadSiteContent();
    }, [currentUser?.username]);



    // --- 2. HANDLE ADMIN DETAILS UPDATE ---
    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        setAdminStatus({ loading: true, error: '', success: '' });
        try {
            const response = await adminServices.updateAdminDetails({ 
                name: adminForm.username, 
                email: adminForm.email 
            });
            
            if (response?.data) {
                // Update Redux state so the dashboard header changes instantly
                dispatch(login({ data: { user: response.data, accessToken: authData.accessToken } }));
                setAdminStatus({ loading: false, error: '', success: 'Account details updated successfully!' });
                setTimeout(() => setAdminStatus(prev => ({ ...prev, success: '' })), 3000);
            }
        } catch (error) {
            setAdminStatus({ loading: false, error: error.message || "Failed to update account.", success: '' });
        }
    };



    // --- 3. HANDLE PUBLIC PORTFOLIO UPDATE ---
    const handlePortfolioSubmit = async (e) => {
        e.preventDefault();
        setPortfolioStatus({ loading: true, error: '', success: '' });
        try {
            // Prepare the keys we need to update
            const keysToUpdate = [
                { sectionKey: 'name', contentValue: portfolioForm.name, contentType: 'text' },
                { sectionKey: 'role', contentValue: portfolioForm.role, contentType: 'text' },
                { sectionKey: 'aboutText', contentValue: portfolioForm.aboutText, contentType: 'text' },
                { sectionKey: 'profilePhotoUrl', contentValue: portfolioForm.profilePhotoUrl, contentType: 'url' }
            ];

            // Use Promise.all to send them all to the database concurrently
            const promises = keysToUpdate.map(item => siteContentServices.writeContent(item));
            await Promise.all(promises);

            setPortfolioStatus({ loading: false, error: '', success: 'Public portfolio updated successfully!' });
            setTimeout(() => setPortfolioStatus(prev => ({ ...prev, success: '' })), 3000);
        } catch (error) {
            setPortfolioStatus({ loading: false, error: error.message || "Failed to update portfolio.", success: '' });
        }
    };


    
    // --- 4. HANDLE PASSWORD CHANGE ---
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordStatus({ loading: true, error: '', success: '' });
        try {
            await adminServices.changeCurrentPassword({ 
                oldpassword: passwordForm.oldpassword, 
                newpassword: passwordForm.newpassword 
            });
            setPasswordStatus({ loading: false, error: '', success: 'Password changed securely!' });
            setPasswordForm({ oldpassword: '', newpassword: '' });
            setTimeout(() => setPasswordStatus(prev => ({ ...prev, success: '' })), 3000);
        } catch (error) {
            setPasswordStatus({ loading: false, error: error.message || "Incorrect old password.", success: '' });
        }
    };

    const handleAdminChange = (e) => setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
    const handlePortfolioChange = (e) => setPortfolioForm({ ...portfolioForm, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

    if (initialFetchLoading) {
        return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div></div>;
    }

    return (
        <div className="w-full px-4 py-8 mx-auto max-w-5xl space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
                <p className="mt-2 text-slate-600">Manage your administrative credentials and public portfolio presence.</p>
            </div>

            {/* SECTION 1: PUBLIC PORTFOLIO (SITE CONTENT) */}
            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Public Hero Section</h2>
                {portfolioStatus.error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">{portfolioStatus.error}</div>}
                {portfolioStatus.success && <div className="p-4 mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">{portfolioStatus.success}</div>}

                <form onSubmit={handlePortfolioSubmit} className="space-y-6">
                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* Live Image Preview Area */}
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <div className="relative w-32 h-32 overflow-hidden bg-slate-100 border-2 border-dashed rounded-full border-slate-300">
                                {portfolioForm.profilePhotoUrl ? (
                                    <img src={portfolioForm.profilePhotoUrl} alt="Profile Preview" className="object-cover w-full h-full" />
                                ) : (
                                    <svg className="absolute w-12 h-12 text-slate-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Live Preview</span>
                        </div>

                        {/* Input Fields */}
                        <div className="grow space-y-4">
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-slate-700">Display Name</label>
                                <input type="text" name="name" value={portfolioForm.name} onChange={handlePortfolioChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Ayush" />
                            </div>
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-slate-700">Role / Tagline</label>
                                <input type="text" name="role" value={portfolioForm.role} onChange={handlePortfolioChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Full Stack Developer" />
                            </div>
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-slate-700">Image Link (Imgur, GitHub, etc.)</label>
                                <input type="url" name="profilePhotoUrl" value={portfolioForm.profilePhotoUrl} onChange={handlePortfolioChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://..." />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block mb-1.5 text-sm font-semibold text-slate-700">Bio / About Text</label>
                        <textarea name="aboutText" value={portfolioForm.aboutText} onChange={handlePortfolioChange} rows="3" className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-y" placeholder="Short description about yourself..."></textarea>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={portfolioStatus.loading} className="px-6 py-2.5 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors">
                            {portfolioStatus.loading ? 'Saving...' : 'Update Portfolio'}
                        </button>
                    </div>
                </form>
            </div>

            {/* SECTION 2: ADMIN ACCOUNT DETAILS */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-slate-900">Account Credentials</h2>
                    {adminStatus.error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">{adminStatus.error}</div>}
                    {adminStatus.success && <div className="p-4 mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">{adminStatus.success}</div>}
                    
                    <form onSubmit={handleAdminSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">Master Username</label>
                            <input type="text" name="username" value={adminForm.username} onChange={handleAdminChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">Recovery Email</label>
                            <input type="email" name="email" value={adminForm.email} onChange={handleAdminChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={adminStatus.loading} className="px-6 py-2.5 font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-70 transition-colors">
                                {adminStatus.loading ? 'Updating...' : 'Update Details'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* SECTION 3: SECURITY (CHANGE PASSWORD) */}
                <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-slate-900">Security</h2>
                    {passwordStatus.error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">{passwordStatus.error}</div>}
                    {passwordStatus.success && <div className="p-4 mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">{passwordStatus.success}</div>}
                    
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">Current Password</label>
                            <input type={showPasswords ? "text" : "password"} name="oldpassword" value={passwordForm.oldpassword} onChange={handlePasswordChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required placeholder="••••••••" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-semibold text-slate-700">New Password</label>
                            <input type={showPasswords ? "text" : "password"} name="newpassword" value={passwordForm.newpassword} onChange={handlePasswordChange} className="w-full px-4 py-2 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required placeholder="••••••••" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={showPasswords} onChange={() => setShowPasswords(!showPasswords)} className="w-4 h-4 text-indigo-600 rounded" />
                                <span className="text-sm font-medium text-slate-600">Show passwords</span>
                            </label>
                            <button type="submit" disabled={passwordStatus.loading} className="px-6 py-2.5 font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-70 transition-colors">
                                {passwordStatus.loading ? 'Updating...' : 'Change Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;