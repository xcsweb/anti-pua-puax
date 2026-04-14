import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { questions } from '../data/questions';
import { ProgressBar } from '../components/ProgressBar';
import { ChatSimulation } from '../components/ChatSimulation';
import { AnimatePresence } from 'framer-motion';

import type { ScoreOption } from '../types';

export default function Assessment() {
  const navigate = useNavigate();
  const { currentQuestionIndex, answerQuestion, isFinished, gender } = useStore();

  useEffect(() => {
    if (isFinished) {
      navigate('/result');
    }
  }, [isFinished, navigate]);

  // 如果没有选择性别，跳回首页
  useEffect(() => {
    if (!gender) {
      navigate('/');
    }
  }, [gender, navigate]);

  const filteredQuestions = questions.filter(
    q => !q.targetGender || q.targetGender === gender
  );

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-black uppercase">加载中...</h1>
      </div>
    );
  }

  const handleAnswer = (optionId: string, scores: ScoreOption) => {
    answerQuestion(currentQuestion.id, optionId, scores, currentQuestion.category);
  };

  return (
    <div className="w-full flex flex-col min-h-[80vh] px-4 py-8">
      <div className="max-w-4xl mx-auto w-full">
        <ProgressBar current={currentQuestionIndex + 1} total={filteredQuestions.length} />

        <div className="mt-8 flex-grow">
          <AnimatePresence mode="wait">
            <ChatSimulation
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              index={currentQuestionIndex}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}