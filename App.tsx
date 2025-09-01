import React, { useState, useCallback, useEffect } from 'react';
import { generateQuiz } from './services/geminiService';
import { QuizQuestion, UserAnswer, AppState, Difficulty } from './types';
import TopicInput from './components/TopicInput';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('TOPIC_SELECTION');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    }
    return 'dark';
  });
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleGenerateQuiz = useCallback(async (topic: string, difficulty: Difficulty) => {
    setIsLoading(true);
    setAppState('GENERATING');
    setError(null);
    try {
      const generatedQuestions = await generateQuiz(topic, difficulty);
      setQuestions(generatedQuestions);
      setUserAnswers([]);
      setAppState('QUIZ');
    } catch (err) {
      setError((err as Error).message);
      setAppState('TOPIC_SELECTION');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleQuizSubmit = (answers: Omit<UserAnswer, 'isCorrect' | 'correctAnswer'>[]) => {
    const scoredAnswers = answers.map((answer, index) => {
      const question = questions[index];
      return {
        ...answer,
        correctAnswer: question.answer,
        isCorrect: question.answer === answer.selectedOption,
      };
    });
    setUserAnswers(scoredAnswers);
    setAppState('RESULTS');
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setAppState('QUIZ');
  };
  
  const handleNewTopic = () => {
    setQuestions([]);
    setUserAnswers([]);
    setError(null);
    setAppState('TOPIC_SELECTION');
  };

  const renderContent = () => {
    switch (appState) {
      case 'GENERATING':
        return <LoadingSpinner />;
      case 'QUIZ':
        return <Quiz questions={questions} onSubmit={handleQuizSubmit} />;
      case 'RESULTS':
        const score = userAnswers.filter(a => a.isCorrect).length;
        return (
          <Results
            answers={userAnswers}
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
            onNewTopic={handleNewTopic}
          />
        );
      case 'TOPIC_SELECTION':
      default:
        return (
          <>
            <TopicInput 
              onGenerate={handleGenerateQuiz} 
              isLoading={isLoading}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
            />
            {error && <div className="mt-4 p-4 bg-red-500/30 border border-red-500 text-red-800 dark:text-white rounded-lg text-center">{error}</div>}
          </>
        );
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-sky-200 via-violet-200 to-pink-200 dark:from-slate-900 dark:via-black dark:to-purple-900/70 flex items-center justify-center p-4 transition-colors duration-500">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="w-full max-w-4xl">
        {renderContent()}
      </div>
      <footer className="fixed bottom-4 right-4 text-xs text-slate-500 dark:text-white/40">
        Designed by Pankaj © 2025
      </footer>
    </main>
  );
};

export default App;
