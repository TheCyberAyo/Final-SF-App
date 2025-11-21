'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import { User, Lock, HelpCircle, LogOut, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, signOut, isLoading, updateProfile } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (showEditModal && user) {
      setUsername(user.user_metadata?.name || '');
      setEmail(user.email || '');
      setError('');
      setSuccess('');
    }
  }, [showEditModal, user]);

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
    }
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setError('');
    setSuccess('');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await updateProfile({ name: username });
      
      if (updateError) {
        setError(updateError.message || 'Failed to update profile. Please try again.');
        return;
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        setShowEditModal(false);
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const showComingSoon = (feature: string) => {
    alert(`${feature} functionality will be added soon!`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">
              {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {user?.user_metadata?.name || 'User'}
          </h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        {/* User Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <p className="text-white text-lg">
                {user?.user_metadata?.name || 'Not set'}
              </p>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <p className="text-white text-lg">
                {user?.email || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          
          <button
            className="w-full bg-gray-800 rounded-lg p-4 flex items-center gap-4 mb-3 hover:bg-gray-700 transition-colors"
            onClick={handleOpenEditModal}
          >
            <User size={24} className="text-yellow-500" />
            <span className="flex-1 text-left">Edit Profile</span>
            <span className="text-gray-400">›</span>
          </button>

          <button
            className="w-full bg-gray-800 rounded-lg p-4 flex items-center gap-4 mb-3 hover:bg-gray-700 transition-colors"
            onClick={() => showComingSoon('Change Password')}
          >
            <Lock size={24} className="text-yellow-500" />
            <span className="flex-1 text-left">Change Password</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Support */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Support</h2>
          
          <button
            className="w-full bg-gray-800 rounded-lg p-4 flex items-center gap-4 mb-3 hover:bg-gray-700 transition-colors"
            onClick={() => showComingSoon('Help & Support')}
          >
            <HelpCircle size={24} className="text-yellow-500" />
            <span className="flex-1 text-left">Help & Support</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Sign Out */}
        <button
          className="w-full bg-red-600 hover:bg-red-700 rounded-lg p-4 flex items-center justify-center gap-3 transition-colors"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut size={24} />
          <span className="font-semibold">
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseEditModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

            {/* Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed. Contact support to update your email.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-900 bg-opacity-50 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-yellow-300 disabled:cursor-not-allowed"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

