'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import { User, Lock, HelpCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, signOut, isLoading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      signOut();
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

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          
          <button
            className="w-full bg-gray-800 rounded-lg p-4 flex items-center gap-4 mb-3 hover:bg-gray-700 transition-colors"
            onClick={() => showComingSoon('Edit Profile')}
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
    </div>
  );
}
