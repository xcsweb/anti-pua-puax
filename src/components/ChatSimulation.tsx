import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question, AnswerOption, ScoreOption } from '../types';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { getAvatarUrl } from '../utils/avatars';
import { useStore } from '../store/useStore';

interface ChatSimulationProps {
  question: Question;
  onAnswer: (optionId: string, scores: ScoreOption) => void;
  index: number;
}

export const ChatSimulation: React.FC<ChatSimulationProps> = ({ question, onAnswer, index }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AnswerOption | null>(null);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(question.id);
  
  const gender = useStore((state) => state.gender) || undefined;
  const userAvatar = getAvatarUrl('user', undefined, gender);
  const senderAvatar = getAvatarUrl('sender', question);

  if (question.id !== currentQuestionId) {
    setCurrentQuestionId(question.id);
    setShowOptions(false);
    setSelectedOption(null);
    setDisplayedMessages([]);
    setIsTyping(true);
  }

  useEffect(() => {
    const messages = Array.isArray(question.scenario) ? question.scenario : [question.scenario];
    
    if (displayedMessages.length < messages.length) {
      if (isTyping) {
        // 正在输入，1.5秒后显示下一条消息
        const timer = setTimeout(() => {
          setDisplayedMessages(prev => [...prev, messages[displayedMessages.length]]);
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        // 停顿0.4秒后再次开始输入
        const timer = setTimeout(() => {
          setIsTyping(true);
        }, 400);
        return () => clearTimeout(timer);
      }
    } else {
      // 所有消息已显示完毕
      if (isTyping) {
        setIsTyping(false);
      }
      // 延迟3000ms后显示选项
      if (!showOptions && !selectedOption) {
        const timer = setTimeout(() => {
          setShowOptions(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [displayedMessages.length, isTyping, question.id, question.scenario, showOptions, selectedOption]);

  const handleSelect = (option: AnswerOption) => {
    setSelectedOption(option);
    setShowOptions(false);

    // Simulate sending delay before actually advancing
    setTimeout(() => {
      onAnswer(option.id, option.scores);
    }, 1200);
  };

  // 根据当前题号随机生成一个时间，或者写死
  const timeStr = `晚上 10:${(index * 3 + 12).toString().padStart(2, '0')}`;

  return (
    <div className="w-full h-[100dvh] md:h-[80vh] md:max-h-[850px] max-w-[480px] mx-auto flex flex-col bg-[#ededed] md:rounded-[3rem] md:border-8 md:border-black md:shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden relative">
      {/* 顶部导航栏 (模拟微信) */}
      <div className="bg-[#ededed] h-16 border-b-2 border-gray-300 flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-1 cursor-pointer">
          <ChevronLeft size={28} />
          <span className="font-bold text-lg">{question.senderName}</span>
        </div>
        <div className="font-bold text-xl tracking-wide">
          {isTyping ? '对方正在输入...' : ''}
        </div>
        <MoreHorizontal size={28} className="cursor-pointer" />
      </div>

      {/* 聊天记录区域 */}
      <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-6">
        <div className="text-center text-xs text-gray-500 font-bold my-2">
          {timeStr}
        </div>

        {/* Displayed Messages */}
        <AnimatePresence>
          {displayedMessages.map((text, idx) => (
            <motion.div
              key={`msg-${idx}`}
              initial={{ scale: 0.8, opacity: 0, x: -20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className="self-start max-w-[85%] flex gap-2"
            >
              <img src={senderAvatar} alt="sender" className="w-10 h-10 rounded-md border-2 border-black shrink-0 object-cover bg-gray-200 mt-1" />
              <div className="bg-white border-2 border-black p-3 rounded-2xl rounded-tl-none shadow-[2px_2px_0px_rgba(0,0,0,0.1)] text-base md:text-lg font-bold leading-relaxed text-black mt-1">
                {text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="self-start max-w-[85%] flex gap-2"
            >
              <img src={senderAvatar} alt="sender" className="w-10 h-10 rounded-md border-2 border-black shrink-0 object-cover bg-gray-200" />
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border-2 border-black flex gap-1.5 items-center justify-center h-10 w-16 mt-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outgoing Message (Selected Answer) */}
        <AnimatePresence>
          {selectedOption && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className="self-end max-w-[85%] mt-2 flex gap-2 justify-end"
            >
              <div className="bg-[#95ec69] border-2 border-black p-3 rounded-2xl rounded-tr-none shadow-[2px_2px_0px_rgba(0,0,0,0.1)] text-base md:text-lg font-bold leading-relaxed text-black mt-1">
                {selectedOption.text}
              </div>
              <img src={userAvatar} alt="user" className="w-10 h-10 rounded-md border-2 border-black shrink-0 object-cover bg-gray-200 mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部输入/选项区域 */}
      <div className="bg-[#f7f7f7] border-t-2 border-gray-300 min-h-[160px] p-4 shrink-0 pb-8 md:pb-4 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          {showOptions && !selectedOption ? (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="flex flex-col gap-2 w-full"
            >
              <div className="text-xs text-gray-500 font-bold mb-1 text-center">请选择你的回复</div>
              {question.options.map((option: AnswerOption) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelect(option)}
                  className="bg-white border-2 border-black rounded-xl p-3 text-left text-sm md:text-base font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#fde047] transition-colors"
                >
                  {option.text}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 w-full h-12">
              <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white shrink-0">
                <span className="text-xl -mt-1">+</span>
              </div>
              <div className="flex-grow h-10 bg-white border-2 border-black rounded-lg"></div>
              <div className="w-16 h-10 bg-[#95ec69] border-2 border-black rounded-lg flex items-center justify-center font-bold">
                发送
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};