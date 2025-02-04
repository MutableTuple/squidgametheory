import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="text-center px-4 py-8  flex flex-col items-center justify-center space-y-4">
        <span className="text-6xl animate-pulse">🦑</span> {/* Squid emoji */}
        <h2 className="text-2xl font-pixel text-pink-600">Loading...</h2>
        <p className="text-pink-500">Please wait while we load the content.</p>
      </div>
    </div>
  );
}
