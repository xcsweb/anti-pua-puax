import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, UserRound, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
  const navigate = useNavigate();
  const setGender = useStore((state) => state.setGender);

  const handleStart = (gender: 'male' | 'female') => {
    setGender(gender);
    navigate('/assessment');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      {/* Marquee Background */}
      <div className="absolute inset-0 z-0 flex flex-col justify-around opacity-10 pointer-events-none overflow-hidden select-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="whitespace-nowrap flex text-7xl md:text-9xl font-black uppercase tracking-tighter"
            initial={{ x: i % 2 === 0 ? "0%" : "-50%" }}
            animate={{ x: i % 2 === 0 ? "-50%" : "0%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20 + i * 2,
              ease: "linear",
            }}
          >
            <span className="pr-8">全场景防PUA体质测试 • 职场/家庭/情感 • 全场景防PUA体质测试 • 职场/家庭/情感 • </span>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center gap-8 text-center px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="card-brutal p-8 md:p-16 max-w-4xl bg-[#fde047] flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 uppercase tracking-tighter leading-tight">
            全场景防PUA体质测试
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-10 max-w-2xl mx-auto">
            职场/家庭/情感全覆盖，测测你是人间清醒，还是天生大冤种？
            <br/>
            选择你的性别，进入沉浸式聊天实战！
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95, rotate: 0 }}
              onClick={() => handleStart('female')}
              className="btn-brutal bg-[#f9a8d4] text-2xl py-4 px-10 flex items-center justify-center gap-4 cursor-pointer"
            >
              <UserRound fill="currentColor" size={28} />
              我是女生
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: 0 }}
              onClick={() => handleStart('male')}
              className="btn-brutal bg-[#93c5fd] text-2xl py-4 px-10 flex items-center justify-center gap-4 cursor-pointer"
            >
              <User fill="currentColor" size={28} />
              我是男生
            </motion.button>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95, rotate: 0 }}
              onClick={() => navigate('/gallery')}
              className="btn-brutal bg-white text-xl py-3 px-8 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black"
            >
              <BookOpen size={24} strokeWidth={3} />
              查看全图鉴
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}