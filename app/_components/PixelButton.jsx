import React from "react";

const PixelButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`pixel-border pixel-shadow bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

export default PixelButton;
