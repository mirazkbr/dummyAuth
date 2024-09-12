"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useSelector((state) => state.auth);

  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    // Check if the token exists in Redux state or localStorage
    const authToken = token || (typeof window !== 'undefined' && localStorage.getItem('authToken'));

    if (!authToken) {
      // Redirect to login if no token and not on login page
      if (pathname !== '/login') {
        router.replace('/login');
      }
    } else if (pathname === '/login') {
      // Redirect to home if already logged in and on login page
      router.replace('/');
    } else {
      // Set the token checked state to true
      setIsTokenChecked(true);
    }
  }, [token, router, pathname]);

  // Only render children after token check to avoid hydration issues
  if (!isTokenChecked && pathname !== '/login') {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return children;
};

export default ProtectedRoute;
