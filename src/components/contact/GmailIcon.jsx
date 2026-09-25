import React from 'react';

export function GmailIcon({ size = 24, className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      className={className}
      fill="none"
    >
      <path d="M16 20.5v-5L22 11v7.5c0 1.1-.9 2-2 2h-4z" fill="#34A853"/>
      <path d="M8 20.5v-5L2 11v7.5c0 1.1.9 2 2 2h4z" fill="#4285F4"/>
      <path d="M16 15.5V4.5L22 9v2l-6 4.5z" fill="#FBBC05"/>
      <path d="M8 15.5V4.5L2 9v2l6 4.5z" fill="#C5221F"/>
      <path d="M16 4.5 12 1.5 8 4.5V15.5l4-3 4 3V4.5z" fill="#EA4335"/>
    </svg>
  );
}
