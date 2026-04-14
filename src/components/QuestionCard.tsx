import React from 'react';
import { motion } from 'framer-motion';
import type { Question, AnswerOption, ScoreOption } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionId: string, scores: ScoreOption) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <motion.div
      key={question.id}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="card-brutal p-8 md:p-12 w-full max-w-2xl bg-[#a78bfa] flex flex-col mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-black mb-8 leading-relaxed tracking-tight">
        {question.scenario}
      </h2>

      <div className="flex flex-col gap-4">
        {question.options.map((option: AnswerOption, index: number) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option.id, option.scores)}
            className="btn-brutal bg-white text-left p-4 md:p-6 text-lg md:text-xl font-bold w-full hover:bg-[#fde047] transition-colors"
          >
            <span className="inline-block w-8 font-black">{String.fromCharCode(65 + index)}.</span>
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
