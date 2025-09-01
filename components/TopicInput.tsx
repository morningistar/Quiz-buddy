import React, { useState } from 'react';
import QuizBuddy from './QuizBuddy';
import DifficultySelector from './DifficultySelector';
import { Difficulty } from '../types';

interface TopicInputProps {
  onGenerate: (topic: string, difficulty: Difficulty) => void;
  isLoading: boolean;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onGenerate, isLoading, difficulty, onDifficultyChange }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerate(topic, difficulty);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center text-slate-800 dark:text-white transform transition-all duration-500 hover:scale-105">
      <QuizBuddy className="w-28 h-28 mx-auto mb-4" />
      <h1 className="text-4xl font-bold mb-2">Quiz Buddy</h1>
      <p className="text-lg text-slate-600 dark:text-white/80 mb-8">Enter any topic to start your AI-powered quiz!</p>
      <form onSubmit={handleSubmit}>
        <DifficultySelector selectedDifficulty={difficulty} onDifficultyChange={onDifficultyChange} />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'The Roman Empire' or 'React.js Hooks'"
          className="w-full px-4 py-3 bg-white/50 dark:bg-white/10 border-2 border-transparent rounded-lg focus:outline-none focus:border-pink-400 transition-colors duration-300 placeholder-slate-500 dark:placeholder-white/50 mb-6"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-bold text-white shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 dark:hover:shadow-[0_0_15px_2px_rgba(255,46,255,0.5)]"
        >
          {isLoading ? 'Generating...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
};

export default TopicInput;
