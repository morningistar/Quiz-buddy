import React from 'react';

const QuizBuddy: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} text-slate-700 dark:text-white`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">
        {/* Head */}
        <rect x="20" y="30" width="60" height="50" rx="10" fill="url(#robotGradient)" stroke="currentColor" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="40" cy="50" r="8" fill="#fff" />
        <circle cx="60" cy="50" r="8" fill="#fff" />
        <circle cx="41" cy="51" r="3" fill="#2c3e50" className="animate-pulse" />
        <circle cx="61" cy="51" r="3" fill="#2c3e50" className="animate-pulse" />
        {/* Antenna */}
        <line x1="50" y1="30" x2="50" y2="15" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="12" r="4" fill="#fde047" />
      </g>
    </svg>
  );
};

export default QuizBuddy;
