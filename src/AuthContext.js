import React, { createContext, useState, useEffect } from 'react';
import {getUserAPICall} from './API.js'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);


  const signIn = async (userData) => {
    
    const data = await getUserAPICall(userData);
    if(data === "ERROR") {
      alert("error fetching user information");
    } else {
      if(data && data[0]) {
        setUser(data[0]);
        localStorage.setItem('user', JSON.stringify(data[0]));
      } else {
        alert("set user 2 done");
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
  }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };


  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };