import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, User, Save, AlertCircle, Loader } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000'; // Add this constant for the API base URL

export default function Profile() {
  const { user, updateUserData } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (username) => {
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (username.length > 30) {
      throw new Error('Username cannot exceed 30 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, and underscores');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    if (password.length > 50) {
      throw new Error('Password cannot exceed 50 characters');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number');
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    try {
      if (!newUsername.trim()) {
        throw new Error('Please enter a new username');
      }

      if (newUsername === user.username) {
        throw new Error('New username must be different from current username');
      }

      validateUsername(newUsername);

      const response = await fetch(`${API_BASE_URL}/api/users/${user._id}/username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update username');
      }

      updateUserData({ ...user, username: data.username });
      setSuccess('Username updated successfully!');
      setNewUsername('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    try {
      if (!currentPassword) {
        throw new Error('Please enter your current password');
      }

      if (!newPassword) {
        throw new Error('Please enter a new password');
      }

      if (!confirmNewPassword) {
        throw new Error('Please confirm your new password');
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error('New passwords do not match');
      }

      if (currentPassword === newPassword) {
        throw new Error('New password must be different from current password');
      }

      validatePassword(newPassword);

      const response = await fetch(`${API_BASE_URL}/api/users/${user._id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">Update your account information</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-400 h-5 w-5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
            <Save className="text-emerald-400 h-5 w-5" />
            <p className="text-emerald-400 text-sm">{success}</p>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <User className="h-5 w-5 text-blue-400" />
            Update Username
          </h2>
          <form onSubmit={handleUsernameUpdate} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Current Username
              </label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                {user?.username || user?.email.split('@')[0]}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                New Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter new username (3-30 characters, letters, numbers, underscore)"
                required
                minLength={3}
                maxLength={30}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Update Username
                  <Save className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Lock className="h-5 w-5 text-blue-400" />
            Change Password
          </h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter current password"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter new password (min 6 chars, 1 uppercase, 1 lowercase, 1 number)"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Update Password
                  <Lock className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}