import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2 font-bold uppercase tracking-tighter">
        <span className="text-xl">Progress</span>
        <span className="text-2xl">{current} / {total}</span>
      </div>
      <div className="h-6 w-full bg-white border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#fde047] border-r-4 border-black"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
