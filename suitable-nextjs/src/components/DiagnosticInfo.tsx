'use client';

import React, { useState } from 'react';

interface DiagnosticInfoProps {
  show?: boolean;
}

export default function DiagnosticInfo({ show = false }: DiagnosticInfoProps) {
  const [isVisible, setIsVisible] = useState(show);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs opacity-50 hover:opacity-100 z-50"
      >
        Debug Info
      </button>
    );
  }

  const diagnosticInfo = {
    environment: process.env.NODE_ENV,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL 
      ? process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 50) + '...'
      : 'NOT SET',
    keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    appScheme: process.env.NEXT_PUBLIC_APP_SCHEME || 'NOT SET',
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
    origin: typeof window !== 'undefined' ? window.location.origin : 'Server'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">App Diagnostic Information</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Environment:</strong>
              <div className={`mt-1 p-2 rounded ${
                diagnosticInfo.environment === 'production' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {diagnosticInfo.environment}
              </div>
            </div>
            
            <div>
              <strong>Timestamp:</strong>
              <div className="mt-1 p-2 bg-gray-100 rounded text-xs">
                {diagnosticInfo.timestamp}
              </div>
            </div>
          </div>

          <div>
            <strong>Supabase Configuration:</strong>
            <div className="mt-2 space-y-2">
              <div className={`p-2 rounded ${
                diagnosticInfo.hasSupabaseUrl ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <div className="font-medium">URL: {diagnosticInfo.hasSupabaseUrl ? '✅ Set' : '❌ Missing'}</div>
                <div className="text-xs text-gray-600">{diagnosticInfo.supabaseUrlPreview}</div>
              </div>
              
              <div className={`p-2 rounded ${
                diagnosticInfo.hasSupabaseKey && diagnosticInfo.keyLength > 100 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <div className="font-medium">
                  API Key: {diagnosticInfo.hasSupabaseKey && diagnosticInfo.keyLength > 100 ? '✅ Set' : '❌ Invalid'}
                </div>
                <div className="text-xs text-gray-600">
                  Length: {diagnosticInfo.keyLength} characters
                </div>
              </div>
              
              <div className={`p-2 rounded ${
                diagnosticInfo.appScheme !== 'NOT SET' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <div className="font-medium">App Scheme: {diagnosticInfo.appScheme}</div>
              </div>
            </div>
          </div>

          <div>
            <strong>Connection Info:</strong>
            <div className="mt-1 p-2 bg-gray-100 rounded text-xs">
              <div>Origin: {diagnosticInfo.origin}</div>
              <div className="truncate">User Agent: {diagnosticInfo.userAgent}</div>
            </div>
          </div>

          {(!diagnosticInfo.hasSupabaseUrl || !diagnosticInfo.hasSupabaseKey) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <h4 className="font-bold text-red-800 mb-2">⚠️ Configuration Issues Detected</h4>
              <div className="text-red-700 text-sm space-y-1">
                {!diagnosticInfo.hasSupabaseUrl && (
                  <div>• NEXT_PUBLIC_SUPABASE_URL is missing</div>
                )}
                {!diagnosticInfo.hasSupabaseKey && (
                  <div>• NEXT_PUBLIC_SUPABASE_ANON_KEY is missing</div>
                )}
                <div className="mt-2 font-medium">
                  This will cause "failed to fetch" errors during authentication.
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsVisible(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
