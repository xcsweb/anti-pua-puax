import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { RotateCcw, Download, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateResult, getResultDetails, calculateCategoryDefense, getDoubleStandardComment } from '../utils/scoring';
import html2canvas from 'html2canvas';
import type { ResultDetails } from '../types';

export default function Result() {
  const navigate = useNavigate();
  const { scores, categoryScores, resetTest, isFinished, testMode, shuffledQuestions } = useStore();
  const cardRef = useRef<HTMLDivElement>(null);

  const [resultCode, setResultCode] = useState('');
  const [details, setDetails] = useState<ResultDetails>({
    title: '',
    desc: '',
    dangerLevel: '',
    keywords: [],
    animal: '',
    bestMatch: '',
    worstMatch: ''
  });
  const [isCapturing, setIsCapturing] = useState(false);

  const totalQuestionsCount = shuffledQuestions.length;

  useEffect(() => {
    // If user accesses this page without finishing, redirect to home
    if (!isFinished) {
      navigate('/');
      return;
    }

    const code = calculateResult(scores, totalQuestionsCount);
    setResultCode(code);
    setDetails(getResultDetails(code, testMode));
  }, [scores, isFinished, navigate, totalQuestionsCount, testMode]);

  const workQuestionsCount = shuffledQuestions.filter(q => q.category === 'work').length;
  const familyQuestionsCount = shuffledQuestions.filter(q => q.category === 'family').length;
  const romanceQuestionsCount = shuffledQuestions.filter(q => q.category === 'romance').length;

  const workScore = calculateCategoryDefense(categoryScores.work, workQuestionsCount);
  const familyScore = calculateCategoryDefense(categoryScores.family, familyQuestionsCount);
  const romanceScore = calculateCategoryDefense(categoryScores.romance, romanceQuestionsCount);

  const doubleStandardComment = getDoubleStandardComment(workScore, familyScore, romanceScore);

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  const handleDownload = async () => {
    if (!cardRef.current || isCapturing) return;
    setIsCapturing(true);
    
    try {
      // 稍微延迟确保渲染完成
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `鉴定图鉴-${resultCode}.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error('Failed to capture image', err);
      alert('生成图鉴失败，请稍后再试');
    } finally {
      setIsCapturing(false);
    }
  };

  if (!resultCode) return null;

  // Glitch animation variants
  const glitchVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      textShadow: [
        "4px 4px 0px #000",
        "-4px -4px 0px #f9a8d4",
        "4px -4px 0px #93c5fd",
        "-4px 4px 0px #fde047",
        "4px 4px 0px #000"
      ],
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 150,
        damping: 10,
        textShadow: {
          duration: 0.2,
          repeatType: "mirror",
          repeat: 5
        }
      }
    }
  };

  const [emoji, animalName] = details.animal ? details.animal.split(' ') : ['🤔', '未知生物'];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-8 overflow-y-auto bg-[#f8fafc] w-full">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[400px] w-full flex flex-col items-center gap-6"
        >
        {/* Card to Capture */}
        <div 
          ref={cardRef}
          className="w-full bg-white relative overflow-hidden"
          style={{ 
            boxShadow: '8px 8px 0px #000',
            border: '4px solid #000',
          }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#fde047] rounded-full border-[4px] border-black opacity-80" />
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#f9a8d4] rotate-[15deg] border-[4px] border-black opacity-80" />
          <div className="absolute top-[30%] -right-12 w-32 h-32 bg-[#93c5fd] rounded-xl rotate-[30deg] border-[4px] border-black opacity-80" />
          <div className="absolute bottom-[20%] -left-10 w-24 h-24 bg-[#86efac] rotate-[-20deg] border-[4px] border-black opacity-80" />
          
          <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6">
            
            {/* Header: Title and Animal Icon */}
            <div className="flex justify-between items-start border-b-[4px] border-black pb-4">
              <div className="flex flex-col">
                <p className="text-sm font-black uppercase tracking-widest text-black/60 mb-1">
                  全场景防PUA体质测试
                </p>
                <motion.h1
                  variants={glitchVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl md:text-6xl font-black tracking-tighter text-[#86efac]"
                  style={{
                    WebkitTextStroke: '2px black',
                    textShadow: '4px 4px 0px #000'
                  }}
                >
                  {resultCode}
                </motion.h1>
              </div>
              
              <div className="flex flex-col items-center justify-center border-[3px] border-black p-2 bg-white rounded-xl shadow-[4px_4px_0px_#000] min-w-[70px] -rotate-3">
                <span className="text-4xl">{emoji}</span>
                <span className="text-sm font-black mt-1 whitespace-nowrap">{animalName}</span>
              </div>
            </div>

            {/* Title and Keywords */}
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-black leading-tight bg-black text-white p-2 inline-block self-start -rotate-1 shadow-[4px_4px_0px_#fde047]">
                {details.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {details.keywords.map((kw, i) => {
                  const colors = ['bg-[#fde047]', 'bg-[#f9a8d4]', 'bg-[#93c5fd]', 'bg-[#86efac]'];
                  const color = colors[i % colors.length];
                  return (
                    <span 
                      key={i} 
                      className={`px-3 py-1 ${color} text-black text-sm font-black border-[3px] border-black shadow-[2px_2px_0px_#000]`}
                    >
                      #{kw}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="p-5 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] rotate-1">
              <p className="text-lg font-bold leading-relaxed text-black">
                {details.desc}
              </p>
            </div>

            {/* Danger Level */}
            <div className="w-full bg-[#fde047] p-4 border-[4px] border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between items-start gap-2 -rotate-1">
              <span className="font-black text-xl whitespace-nowrap">⚠️ 危险系数</span>
              <span className="font-black text-lg bg-white px-3 py-1 border-[3px] border-black text-left w-full">
                {details.dangerLevel}
              </span>
            </div>

            {/* Category Scores Bar Chart */}
            <div className="w-full bg-white p-4 border-[4px] border-black shadow-[4px_4px_0px_#000] flex flex-col gap-3 rotate-1 mt-1">
              <span className="font-black text-xl whitespace-nowrap border-b-[4px] border-black pb-2 mb-1 inline-block self-start">🛡️ 维度防御力</span>
              
              <div className="flex flex-col gap-3">
                {testMode === 'full' && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-10 font-black text-sm">职场</span>
                      <div className="flex-1 h-6 border-[3px] border-black bg-gray-100 relative overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${workScore}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="absolute top-0 left-0 h-full bg-[#93c5fd] border-r-[3px] border-black"
                        />
                      </div>
                      <span className="w-10 text-right font-black">{workScore}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="w-10 font-black text-sm">家庭</span>
                      <div className="flex-1 h-6 border-[3px] border-black bg-gray-100 relative overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${familyScore}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="absolute top-0 left-0 h-full bg-[#fde047] border-r-[3px] border-black"
                        />
                      </div>
                      <span className="w-10 text-right font-black">{familyScore}</span>
                    </div>
                  </>
                )}
                
                <div className="flex items-center gap-2">
                  <span className="w-10 font-black text-sm">情场</span>
                  <div className="flex-1 h-6 border-[3px] border-black bg-gray-100 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${romanceScore}%` }}
                      transition={{ duration: 1, delay: testMode === 'full' ? 0.6 : 0.2 }}
                      className="absolute top-0 left-0 h-full bg-[#f9a8d4] border-r-[3px] border-black"
                    />
                  </div>
                  <span className="w-10 text-right font-black">{romanceScore}</span>
                </div>
              </div>
            </div>

            {/* Double Standard Comment */}
            {testMode === 'full' && (
              <div className="w-full bg-[#c4b5fd] p-4 border-[4px] border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between items-start gap-2 -rotate-1 mt-1">
                <span className="font-black text-xl whitespace-nowrap bg-black text-white px-2 py-1 rotate-2 inline-block shadow-[4px_4px_0px_#fde047]">💡 综合鉴定</span>
                <p className="font-bold text-lg leading-relaxed text-black mt-2 bg-white p-3 border-[3px] border-black w-full shadow-[2px_2px_0px_#000]">
                  {doubleStandardComment}
                </p>
              </div>
            )}
            
            {/* Matches */}
            <div className="flex gap-4 w-full rotate-1 mt-1">
              <div className="flex-1 bg-[#86efac] p-3 border-[4px] border-black shadow-[4px_4px_0px_#000] flex flex-col items-center gap-1">
                <span className="font-black text-sm whitespace-nowrap">💖 天生一对</span>
                <span className="font-black text-xl bg-white px-2 py-1 border-[3px] border-black w-full text-center">
                  {details.bestMatch}
                </span>
              </div>
              <div className="flex-1 bg-[#f9a8d4] p-3 border-[4px] border-black shadow-[4px_4px_0px_#000] flex flex-col items-center gap-1">
                <span className="font-black text-sm whitespace-nowrap">☠️ 天生仇敌</span>
                <span className="font-black text-xl bg-white px-2 py-1 border-[3px] border-black w-full text-center">
                  {details.worstMatch}
                </span>
              </div>
            </div>
            
            {/* Footer */}
            <div className="pt-4 border-t-[4px] border-black border-dashed flex justify-between items-center mt-2">
              <div className="text-xs font-black text-black/50 uppercase tracking-widest">
                全网认证扫描
              </div>
              <div className="text-xs font-black text-black/50">
                100% 真实有效
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 w-full mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.02, rotate: -1 }}
            whileTap={{ scale: 0.98, rotate: 0 }}
            onClick={handleDownload}
            disabled={isCapturing}
            className="flex-1 btn-brutal bg-[#86efac] text-lg py-4 px-6 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black disabled:opacity-50"
          >
            <Download size={24} strokeWidth={3} />
            {isCapturing ? '生成中...' : '保存图鉴'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, rotate: 1 }}
            whileTap={{ scale: 0.98, rotate: 0 }}
            onClick={handleRetake}
            className="flex-1 btn-brutal bg-white text-lg py-4 px-6 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black"
          >
            <RotateCcw size={24} strokeWidth={3} />
            再测一次
          </motion.button>
        </motion.div>

        {/* Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02, rotate: -1 }}
            whileTap={{ scale: 0.98, rotate: 0 }}
            onClick={() => navigate('/gallery')}
            className="w-full btn-brutal bg-[#fde047] text-lg py-4 px-6 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black"
          >
            <BookOpen size={24} strokeWidth={3} />
            查看全图鉴
          </motion.button>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}
