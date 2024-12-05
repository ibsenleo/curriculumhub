import React from 'react'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { authStatus } from '../../utils/const';

export const ProtectedRoute = () => {
    const status = useCheckAuth();
    
    //TODO: FIX Async call on status check
    if(status !== authStatus.LOGGED) return <Navigate to="/auth/login"/>
    
    return (
        <Outlet/>
    )
}
