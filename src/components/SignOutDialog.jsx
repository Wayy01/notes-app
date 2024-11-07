import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';

const SignOutDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog position */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-sm backdrop-blur-xl bg-black/40 p-8 rounded-xl
                       border border-white/10 hover:border-white/20 transition-colors
                       duration-300 shadow-xl shadow-black/20"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  initial={{ rotate: -45 }}
                  animate={{ rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-3 bg-violet-500/10 rounded-xl mb-4"
                >
                  <FiLogOut className="w-8 h-8 text-violet-400" />
                </motion.div>

                {/* Title */}
                <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-violet-400
                                     via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Sign Out
                </Dialog.Title>

                {/* Description */}
                <Dialog.Description className="mt-2 text-white/70">
                  Are you sure you want to sign out? You'll need to sign in again to access your notes.
                </Dialog.Description>

                {/* Buttons */}
                <div className="flex gap-3 w-full mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5
                             hover:bg-white/10 text-white/70 font-medium
                             transition-colors"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                    className="flex-1 px-4 py-2 rounded-lg bg-violet-500
                             hover:bg-violet-600 text-white font-medium
                             transition-colors"
                  >
                    Sign Out
                  </motion.button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-48 h-48
                             bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48
                             bg-violet-500/10 rounded-full blur-3xl" />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default SignOutDialog;
