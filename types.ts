export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface UserAnswer {
  question: string;
  selectedOption: string;
  isCorrect: boolean;
  correctAnswer: string;
}

export type AppState = 'TOPIC_SELECTION' | 'GENERATING' | 'QUIZ' | 'RESULTS';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
