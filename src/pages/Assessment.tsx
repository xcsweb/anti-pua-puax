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
  const { currentQuestionIndex, answerQuestion, isFinished, gender, testMode } = useStore();

  useEffect(() => {
    if (isFinished) {
      navigate('/result');
    }
  }, [isFinished, navigate]);

  // 如果没有选择性别且不是全景模式，跳回首页
  useEffect(() => {
    if (!gender && testMode !== 'full') {
      navigate('/');
    }
  }, [gender, testMode, navigate]);

  let filteredQuestions = questions.filter(
    q => !q.targetGender || q.targetGender === gender
  );

  if (testMode === 'romance') {
    filteredQuestions = filteredQuestions.filter(q => q.category === 'romance' && q.targetGender === gender);
  } else if (testMode === 'full') {
    // just take 50 full mode questions
    filteredQuestions = filteredQuestions.filter(q => !q.targetGender).slice(0, 50);
  }

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
    <div className="w-full flex flex-col min-h-[80vh] px-4 py-8 max-w-screen-xl mx-auto">
      <div className="w-full">
        <ProgressBar current={currentQuestionIndex + 1} total={filteredQuestions.length} />

        <div className="mt-8 flex-grow flex justify-center w-full">
          <div className="w-full max-w-4xl">
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
    </div>
  );
}