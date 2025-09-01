import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm text-yellow-300 dark:text-yellow-300 hover:scale-110 transition-transform duration-300"
    >
      <div className="relative h-6 w-6">
        {/* Sun Icon */}
        <div className={`absolute inset-0 transform transition-all duration-500 ${theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </div>
        {/* Moon Icon */}
        <div className={`absolute inset-0 transform transition-all duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
