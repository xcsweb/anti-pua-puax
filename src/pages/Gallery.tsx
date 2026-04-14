import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Heart } from 'lucide-react';
import { romanceDictionary, fullDictionary } from '../utils/scoring';

export default function Gallery() {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  
  const activeTab = type === 'romance' ? 'romance' : 'full';

  const handleTabChange = (tab: 'full' | 'romance') => {
    navigate(`/gallery/${tab}`);
  };

  const colors = [
    'bg-[#fde047]', // yellow
    'bg-[#f9a8d4]', // pink
    'bg-[#93c5fd]', // blue
    'bg-[#86efac]', // green
    'bg-[#c4b5fd]', // purple
    'bg-[#fca5a5]', // red
    'bg-[#fdba74]', // orange
    'bg-[#d8b4fe]', // light purple
  ];

  const currentDictionary = activeTab === 'full' ? fullDictionary : romanceDictionary;

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] py-8 max-w-screen-xl mx-auto w-full px-4 md:px-8">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="btn-brutal bg-white text-xl py-3 px-6 flex items-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black self-start md:self-auto"
        >
          <ArrowLeft size={24} strokeWidth={3} />
          返回首页
        </motion.button>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center leading-tight">
          全场景防PUA体质测试 <br /> PUAX图鉴
        </h1>
        {/* Spacer for centering title on desktop */}
        <div className="w-[180px] hidden md:block"></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTabChange('full')}
          className={`btn-brutal text-xl py-3 px-6 flex items-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black ${
            activeTab === 'full' ? 'bg-[#86efac]' : 'bg-white'
          }`}
        >
          <Briefcase size={24} strokeWidth={3} />
          全景模式
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTabChange('romance')}
          className={`btn-brutal text-xl py-3 px-6 flex items-center gap-3 cursor-pointer shadow-[4px_4px_0px_#000] border-[4px] border-black font-black ${
            activeTab === 'romance' ? 'bg-[#f9a8d4]' : 'bg-white'
          }`}
        >
          <Heart size={24} strokeWidth={3} />
          恋爱模式
        </motion.button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full">
        {Object.entries(currentDictionary).map(([code, details], index) => {
          const bgColor = colors[index % colors.length];
          // Assuming animal format is "🦅 孤鹰" or just "🦅"
          const parts = details.animal.split(' ');
          const emoji = parts[0];
          const animalName = parts.slice(1).join(' ') || emoji;

          return (
            <motion.div
              key={code + activeTab} // 强制重新渲染动画
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05, 
                type: 'spring', 
                stiffness: 200, 
                damping: 20 
              }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`card-brutal p-6 flex flex-col items-center text-center ${bgColor} border-[4px] border-black shadow-[8px_8px_0px_#000] h-full`}
            >
              {/* Emoji Circle */}
              <div className="text-5xl mb-4 bg-white w-24 h-24 rounded-full flex items-center justify-center border-[4px] border-black shadow-[4px_4px_0px_#000]">
                {emoji}
              </div>
              
              {/* Code & Animal Name */}
              <h2 className="text-4xl font-black mb-1 uppercase tracking-tight">{code}</h2>
              <p className="text-sm font-black bg-white px-4 py-1 border-[2px] border-black shadow-[2px_2px_0px_#000] rounded-full mb-4">
                {animalName}
              </p>

              {/* Title */}
              <h3 className="text-2xl font-black mb-4 min-h-[64px] flex items-center justify-center leading-tight">
                {details.title}
              </h3>
              
              {/* Description */}
              <div className="flex-grow w-full border-t-[3px] border-black/20 pt-4 mb-4 text-left">
                <p className="text-base font-bold leading-snug line-clamp-4" title={details.desc}>
                  {details.desc}
                </p>
              </div>
              
              {/* Keywords */}
              <div className="flex flex-wrap gap-2 justify-center mt-auto w-full">
                {details.keywords.slice(0, 3).map((kw) => (
                  <span 
                    key={kw} 
                    className="text-xs font-black bg-white px-2 py-1 border-[2px] border-black rounded shadow-[2px_2px_0px_#000]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
