import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, UserRound, BookOpen, Heart, ShieldAlert } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HomeProps {
  mode?: 'romance' | 'full';
}

export default function Home({ mode = 'romance' }: HomeProps) {
  const navigate = useNavigate();
  const setGender = useStore((state) => state.setGender);
  const setTestMode = useStore((state) => state.setTestMode);

  const handleStartRomance = (gender: 'male' | 'female') => {
    setGender(gender);
    setTestMode('romance');
    navigate('/assessment');
  };

  const handleStartFull = () => {
    setGender(null);
    setTestMode('full');
    navigate('/assessment');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden w-full">
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
      <div className="z-10 flex flex-col items-center gap-8 text-center px-4 w-full">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="card-brutal p-8 md:p-12 max-w-screen-xl w-full bg-[#fde047] flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 uppercase tracking-tighter leading-tight">
            {mode === 'romance' ? '反渣测试' : '全景防PUA综合测试'}
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-10 max-w-2xl mx-auto">
            {mode === 'romance' 
              ? '专注情感领域，测测你是人间清醒，还是天生大冤种？' 
              : '职场/家庭/情感全覆盖，测测你是人间清醒，还是天生大冤种？'}
          </p>

          <div className="w-full max-w-2xl mx-auto">
            {mode === 'romance' && (
              <div className="card-brutal bg-white p-8 flex flex-col items-center justify-between border-[4px] border-black shadow-[8px_8px_0px_#000]">
                <div className="flex flex-col items-center mb-6">
                  <Heart size={48} className="text-[#f9a8d4] mb-4" strokeWidth={3} />
                  <h2 className="text-3xl font-black mb-2">赛博恋爱段位测试</h2>
                  <p className="text-lg font-bold text-gray-700">专注情感领域，测试你的恋爱防线</p>
                  <p className="text-sm font-bold text-red-500 mt-2">（请选择性别以进入对应的沉浸式场景）</p>
                </div>
                <div className="flex flex-col xl:flex-row gap-4 w-full justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                    onClick={() => handleStartRomance('female')}
                    className="btn-brutal bg-[#f9a8d4] text-xl py-3 px-6 flex-1 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserRound fill="currentColor" size={24} />
                    我是女生
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                    onClick={() => handleStartRomance('male')}
                    className="btn-brutal bg-[#93c5fd] text-xl py-3 px-6 flex-1 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <User fill="currentColor" size={24} />
                    我是男生
                  </motion.button>
                </div>
              </div>
            )}

            {mode === 'full' && (
              <div className="card-brutal bg-white p-8 flex flex-col items-center justify-between border-[4px] border-black shadow-[8px_8px_0px_#000]">
                <div className="flex flex-col items-center mb-6">
                  <ShieldAlert size={48} className="text-[#fde047] mb-4" strokeWidth={3} />
                  <h2 className="text-3xl font-black mb-2">全景防PUA综合测试</h2>
                  <p className="text-lg font-bold text-gray-700">职场、家庭、社交全方位极限施压</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95, rotate: 0 }}
                  onClick={handleStartFull}
                  className="btn-brutal bg-[#4ade80] text-2xl py-4 px-8 w-full flex items-center justify-center gap-3 cursor-pointer mt-auto"
                >
                  <ShieldAlert size={28} strokeWidth={3} />
                  进入全景测试
                </motion.button>
              </div>
            )}
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95, rotate: 0 }}
              onClick={() => navigate(mode === 'romance' ? '/gallery/romance' : '/gallery/full')}
              className="btn-brutal bg-white text-xl py-3 px-8 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black"
            >
              <BookOpen size={24} strokeWidth={3} />
              查看{mode === 'romance' ? '恋爱' : '全景'}图鉴
            </motion.button>
            <p className="text-sm font-bold text-gray-700 opacity-80">本测试仅供娱乐，请勿当真</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}