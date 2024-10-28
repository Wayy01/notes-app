import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextMenu = ({ isOpen, x, y, items, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{ left: x, top: y }}
        className="fixed z-50 min-w-[160px] py-1 bg-[--bg-secondary]
                 border border-white/10 rounded-lg shadow-lg backdrop-blur-lg"
      >
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <button
              onClick={() => {
                item.onClick();
                onClose();
              }}
              disabled={item.disabled}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2
                       transition-colors duration-200
                       ${item.disabled
                         ? 'text-white/30 cursor-not-allowed'
                         : item.danger
                           ? 'text-red-400 hover:bg-red-500/10'
                           : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </button>
            {item.divider && index < items.length - 1 && (
              <div className="my-1 border-t border-white/10" />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </>
  );
};

export default ContextMenu;
