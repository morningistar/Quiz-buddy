import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const difficulties: { level: Difficulty; color: string; hoverColor: string; selectedColor: string }[] = [
  { level: 'Easy', color: 'bg-green-500/30 dark:bg-green-500/40', hoverColor: 'hover:bg-green-500/50 dark:hover:bg-green-500/60', selectedColor: 'bg-green-500' },
  { level: 'Medium', color: 'bg-orange-500/30 dark:bg-orange-500/40', hoverColor: 'hover:bg-orange-500/50 dark:hover:bg-orange-500/60', selectedColor: 'bg-orange-500' },
  { level: 'Hard', color: 'bg-red-500/30 dark:bg-red-500/40', hoverColor: 'hover:bg-red-500/50 dark:hover:bg-red-500/60', selectedColor: 'bg-red-500' },
];

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ selectedDifficulty, onDifficultyChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-center text-slate-700 dark:text-white/80 mb-3 font-semibold">Choose Difficulty</label>
      <div className="flex justify-center items-center bg-slate-200/50 dark:bg-white/10 rounded-lg p-1 space-x-1">
        {difficulties.map(({ level, color, hoverColor, selectedColor }) => (
          <button
            key={level}
            type="button"
            onClick={() => onDifficultyChange(level)}
            className={`w-full py-2 px-4 rounded-md text-sm font-bold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-gray-800 focus:ring-pink-500 ${
              selectedDifficulty === level
                ? `${selectedColor} text-white shadow-md`
                : `${color} ${hoverColor} text-slate-800 dark:text-white hover:scale-105`
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
