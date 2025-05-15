"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import LoginPage from '@/app/login/page';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
        // console.log("works")
    }, [router, user]);

    return <div>{user ? children : <LoginPage />}</div>;
};

export default ProtectedRoute;