import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, UserAnswer } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onSubmit: (answers: Omit<UserAnswer, 'isCorrect' | 'correctAnswer'>[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = questions.map((q, index) => ({
        question: q.question,
        selectedOption: selectedAnswers[index] || ''
    }));
    onSubmit(finalAnswers);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-slate-800 dark:text-white">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-sm font-semibold">{Math.round(((currentQuestionIndex) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-black/10 dark:bg-white/20 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {/* Question */}
            <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === option;
                return (
                    <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-4 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                        ? 'bg-pink-600/90 shadow-lg ring-2 ring-white text-white'
                        : 'bg-black/10 dark:bg-white/20 hover:bg-black/20 dark:hover:bg-white/30'
                    }`}
                    >
                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                );
                })}
            </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex justify-end">
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestionIndex]}
            className="py-2 px-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 dark:hover:shadow-[0_0_15px_2px_rgba(255,46,255,0.5)]"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswers[currentQuestionIndex]}
            className="py-2 px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 dark:hover:shadow-[0_0_15px_2px_rgba(255,46,255,0.5)]"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;