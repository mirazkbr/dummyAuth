"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/features/authSlice';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    // Redirect to login when user logs out
    if (!user && !token) {
      router.replace('/login');
    }
  }, [user, token, router]);

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
