"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "./utills";
import { formatPoints } from "./CommonFunction";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isLogged, setIsLogged] = useState(true);
  const [brokerBalance, setBrokerBalance] = useState(0);

  useEffect(() => {
    localStorage.getItem("userDetails") && setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
    setIsLogged(isLoggedIn());

    const handleStorageChange = (event) => {
      setIsLogged(isLoggedIn());
      localStorage.getItem("userDetails") && setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
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
    window.location.href = "/";
  };

  const setBrokerPoints = (balance) => {
    localStorage.setItem("brokerBalance", balance);
    setBrokerBalance(formatPoints(balance));
    window.dispatchEvent(new Event("storage"));
  };

  const contextValue = {
    userDetails,
    isLogged,
    login,
    logout,
    isLoggedIn,
    setBrokerPoints,
    brokerBalance,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
