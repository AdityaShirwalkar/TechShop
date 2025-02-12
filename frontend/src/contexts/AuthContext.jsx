import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Uncomment and modify the useEffect if you want to implement token verification
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if(token) {
  //     fetch('http://localhost:5000/api/auth/verify', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       setUser(data.user);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       localStorage.removeItem('token');
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      setUser(data);
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }
      
      setUser(data);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/username`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update username');
      }

      setUser(prevUser => ({
        ...prevUser,
        username: data.username
      }));

      return data;
    } catch (error) {
      console.error('Update username error:', error);
      throw error;
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      return data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  };

  const updateUserData = (newData) => {
    setUser(newData);
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUsername,
    updatePassword,
    updateUserData
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUsername, updatePassword, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};