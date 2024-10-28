import React from 'react';
import { motion } from 'framer-motion';

const NavItem = ({ icon, label, count, active, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg
                transition-colors duration-200 group cursor-pointer
                ${active
                  ? 'bg-violet-500/20 text-violet-400'
                  : 'hover:bg-white/5 text-white/70'}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>

      {typeof count === 'number' && (
        <span className={`text-xs px-2 py-0.5 rounded-full
                       ${active
                         ? 'bg-violet-500/30 text-violet-300'
                         : 'bg-white/10 text-white/50'}`}>
          {count}
        </span>
      )}
    </motion.div>
  );
};

export default NavItem;
