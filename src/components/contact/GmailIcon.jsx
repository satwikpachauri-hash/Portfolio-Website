import React from 'react';

export function GmailIcon({ size = 24, className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      aria-label="Gmail" role="img"
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      className={className}
      style={{ overflow: 'visible' }}
    >
      <g transform="translate(256, 256) scale(1.35) translate(-256, -256)">
        <path d="M158 391v-142l-82-63V361q0 30 30 30" className="gmail-path-blue" />
        <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" className="gmail-path-red" />
        <path d="M354 391v-142l82-63V361q0 30-30 30" className="gmail-path-green" />
        <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" className="gmail-path-dark-red" />
        <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" className="gmail-path-yellow" />
      </g>
    </svg>
  );
}
