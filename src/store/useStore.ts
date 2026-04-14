import { create } from 'zustand';
import type { ScoreOption, Gender, CategoryScores, Question, TestMode } from '../types';
import { questions } from '../data/questions';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const generateShuffledQuestions = (gender: Gender, testMode: TestMode): Question[] => {
  if (!testMode) return [];
  
  let filteredQuestions = questions.filter(
    q => !q.targetGender || q.targetGender === gender
  );

  if (testMode === 'romance') {
    filteredQuestions = filteredQuestions.filter(q => q.category === 'romance' && q.targetGender === gender);
  } else if (testMode === 'full') {
    filteredQuestions = filteredQuestions.filter(q => !q.targetGender);
  }

  // Shuffle questions
  let shuffled = shuffleArray(filteredQuestions);
  
  if (testMode === 'full') {
    shuffled = shuffled.slice(0, 50);
  }

  // Shuffle options for each question
  shuffled = shuffled.map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));

  return shuffled;
};

interface StoreState {
  gender: Gender;
  testMode: TestMode;
  currentQuestionIndex: number;
  scores: ScoreOption;
  categoryScores: CategoryScores;
  answers: Record<string, string>; // questionId -> optionId
  isFinished: boolean;
  shuffledQuestions: Question[];
  setGender: (gender: Gender) => void;
  setTestMode: (mode: TestMode) => void;
  answerQuestion: (questionId: string, optionId: string, optionScores: ScoreOption, category: Question['category']) => void;
  resetTest: () => void;
}

const initialScores: ScoreOption = { p: 0, u: 0, a: 0, x: 0 };
const initialCategoryScores: CategoryScores = {
  romance: { ...initialScores },
  work: { ...initialScores },
  family: { ...initialScores },
  social: { ...initialScores },
};

export const useStore = create<StoreState>((set) => ({
  gender: null,
  testMode: null,
  currentQuestionIndex: 0,
  scores: { ...initialScores },
  categoryScores: JSON.parse(JSON.stringify(initialCategoryScores)),
  answers: {},
  isFinished: false,
  shuffledQuestions: [],

  setGender: (gender: Gender) => {
    set((state) => ({ 
      gender,
      shuffledQuestions: generateShuffledQuestions(gender, state.testMode)
    }));
  },

  setTestMode: (mode: TestMode) => {
    set((state) => ({ 
      testMode: mode,
      shuffledQuestions: generateShuffledQuestions(state.gender, mode)
    }));
  },

  answerQuestion: (questionId, optionId, optionScores, category) => {
    set((state) => {
      // Don't record again if already answered
      if (state.answers[questionId]) return state;

      const newScores = {
        p: state.scores.p + optionScores.p,
        u: state.scores.u + optionScores.u,
        a: state.scores.a + optionScores.a,
        x: state.scores.x + optionScores.x,
      };

      const newCategoryScores = {
        ...state.categoryScores,
        [category]: {
          p: state.categoryScores[category].p + optionScores.p,
          u: state.categoryScores[category].u + optionScores.u,
          a: state.categoryScores[category].a + optionScores.a,
          x: state.categoryScores[category].x + optionScores.x,
        }
      };

      const nextIndex = state.currentQuestionIndex + 1;
      const finished = nextIndex >= state.shuffledQuestions.length;

      return {
        answers: { ...state.answers, [questionId]: optionId },
        scores: newScores,
        categoryScores: newCategoryScores,
        currentQuestionIndex: finished ? state.currentQuestionIndex : nextIndex,
        isFinished: finished,
      };
    });
  },

  resetTest: () => {
    set({
      gender: null,
      testMode: null,
      currentQuestionIndex: 0,
      scores: { ...initialScores },
      categoryScores: JSON.parse(JSON.stringify(initialCategoryScores)),
      answers: {},
      isFinished: false,
      shuffledQuestions: [],
    });
  },
}));