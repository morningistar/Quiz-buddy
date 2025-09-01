import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Difficulty } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The quiz question."
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of 4 possible answers."
      },
      answer: {
        type: Type.STRING,
        description: "The correct answer, which must be one of the options."
      },
    },
    required: ["question", "options", "answer"],
  },
};

export const generateQuiz = async (topic: string, difficulty: Difficulty): Promise<QuizQuestion[]> => {
  try {
    const prompt = `
      Generate 10 multiple choice questions (MCQs) of ${difficulty} difficulty based on the topic: "${topic}".
      Each question must have exactly 4 options.
      One of the options must be the correct answer.
      Return the result as a JSON array of objects.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const quizData: QuizQuestion[] = JSON.parse(jsonText);
    
    // Validate data structure
    if (!Array.isArray(quizData) || quizData.length === 0) {
      throw new Error("Invalid quiz data format received from API.");
    }

    return quizData;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz. The topic might be too restrictive. Please try another topic.");
  }
};
