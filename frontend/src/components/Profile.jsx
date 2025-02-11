import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, User, Save, AlertCircle, Loader } from 'lucide-react';

export default function Profile() {
  const { user, updatePassword, updateUsername } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await updateUsername(newUsername);
      setSuccess('Username updated successfully!');
      setNewUsername('');
    } catch (err) {
      setError('Failed to update username');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmNewPassword) {
      return setError('New passwords do not match');
    }

    setIsLoading(true);
    try {
      await updatePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

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
                {user?.email.split('@')[0]}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                New Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter new username"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
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
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter new password"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Confirm new password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
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