import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[--bg-secondary] rounded-lg shadow-lg max-w-md w-full p-6"
      >
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${type === 'danger' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
            <FiAlertTriangle className={`w-6 h-6 ${type === 'danger' ? 'text-red-400' : 'text-yellow-400'}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white/90">{title}</h3>
            <p className="mt-2 text-white/70">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white
                     hover:bg-white/5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg
                     ${type === 'danger'
                       ? 'bg-red-500 hover:bg-red-600 text-white'
                       : 'bg-yellow-500 hover:bg-yellow-600 text-black'}`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDialog;
