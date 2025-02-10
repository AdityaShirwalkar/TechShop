import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    // useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     if(token) {
    //         fetch('http://localhost:5000/api/auth/verify',{
    //             headers:{Authorization:`Bearer ${token}`}
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             setUser(data.user);
    //             setLoading(false);
    //         })
    //         .catch(()=>{
    //             localStorage.removeItem('token');
    //             setLoading(false);
    //         });
    //     } else {
    //         setLoading(false);
    //     }
    // },[]);


  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};