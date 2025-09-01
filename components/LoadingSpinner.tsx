import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-slate-800 dark:text-white text-center p-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-pink-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', borderTopColor: 'transparent', borderLeftColor: 'transparent' }}></div>
        <div className="absolute inset-2 border-2 border-indigo-500/40 rounded-full animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">🧠</div>
      </div>
      <p className="mt-6 text-xl font-semibold tracking-wider animate-pulse">
        Your quiz is being created...
      </p>
    </div>
  );
};

export default LoadingSpinner;
