import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (username) => {
    setUser(username);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};