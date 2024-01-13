"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken } from './utills';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    setIsLogged(isLoggedIn());

    const handleStorageChange = (event) => {
      setIsLogged(isLoggedIn());
      setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isLoggedIn = () => {
    return Boolean(userDetails && getToken());
  };

  const login = (userDetails, token) => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("token", token);
    setUserDetails(userDetails);
    setIsLogged(true);
    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    setUserDetails({});
    setIsLogged(false);
    window.location.href="/"
  };

  const contextValue = {
    userDetails,
    isLogged,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
