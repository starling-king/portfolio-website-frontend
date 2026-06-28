// AdminAuthLayout.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import adminServices from '../Services/admin_users.Services.js';
import { login, logout } from '../store/AuthSlice.js';

function AdminAuthLayout({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {

        setLoading(true)

        if (!authStatus) {
            adminServices.getCurrentUser()
                .then((userData) => {
                    if (userData) {
                        dispatch(login({ data: userData }));
                    } else {
                        dispatch(logout());
                    }
                })
                .catch(() => {
                    dispatch(logout());
                })
                .finally(() => setLoading(false));
                
        } else {
            setLoading(false);
        }
    }, [authStatus, dispatch]);

    if (loading) return <div>Authenticating Admin...</div>;

    if (!authStatus) return <Navigate to="/login" />;

    return <>{children}</>;
}

export default AdminAuthLayout;