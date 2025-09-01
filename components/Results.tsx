import React from 'react';
import { UserAnswer } from '../types';

interface ResultsProps {
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onNewTopic: () => void;
}

const Results: React.FC<ResultsProps> = ({ answers, score, totalQuestions, onRestart, onNewTopic }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage === 100) return "Perfect Score! You're a genius!";
    if (percentage >= 80) return "Excellent Work! You really know your stuff.";
    if (percentage >= 60) return "Great Job! A solid performance.";
    if (percentage >= 40) return "Good Effort! Keep learning.";
    return "Keep trying! You'll get there.";
  };

  const getStarRating = () => {
    const numStars = Math.floor(percentage / 20);
    return '★'.repeat(numStars) + '☆'.repeat(5 - numStars);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-slate-800 dark:text-white animate-[fadeIn_0.5s_ease-in-out]">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">{getResultMessage()}</h2>
        <p className="text-7xl font-bold my-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 dark:from-cyan-400 dark:to-pink-500">{score} / {totalQuestions}</p>
        <p className="text-3xl text-yellow-300">{getStarRating()}</p>
      </div>

      <div className="max-h-80 overflow-y-auto pr-4 space-y-4 mb-8">
        {answers.map((answer, index) => (
          <div key={index} className="bg-black/10 dark:bg-black/20 p-4 rounded-lg">
            <p className="font-bold mb-2">{index + 1}. {answer.question}</p>
            <div className="space-y-2">
                {answer.isCorrect ? (
                    <div className="p-2 rounded bg-green-500/30 border border-green-400 text-green-800 dark:text-white">
                        Your answer: {answer.selectedOption} ✔
                    </div>
                ) : (
                    <>
                    <div className="p-2 rounded bg-red-500/30 border border-red-400 text-red-800 dark:text-white">
                        Your answer: {answer.selectedOption || "Not answered"} ❌
                    </div>
                     <div className="p-2 rounded bg-green-500/30 border border-green-400 text-green-800 dark:text-white">
                        Correct answer: {answer.correctAnswer}
                    </div>
                    </>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          onClick={onRestart}
          className="py-3 px-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 text-white dark:hover:shadow-[0_0_15px_2px_rgba(255,46,255,0.5)]"
        >
          Try Again
        </button>
        <button
          onClick={onNewTopic}
          className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 text-white dark:hover:shadow-[0_0_15px_2px_rgba(255,46,255,0.5)]"
        >
          New Topic
        </button>
      </div>
    </div>
  );
};

export default Results;
