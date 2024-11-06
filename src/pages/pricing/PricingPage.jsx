import React from 'react';
import { motion } from 'framer-motion';
import { FiTool, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FiTool className="w-16 h-16 text-violet-400" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Pricing Coming Soon
        </h1>

        <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
          We're currently in beta and working hard to bring you our pricing plans.
          Stay tuned for updates!
        </p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-violet-500 hover:bg-violet-600
                     text-white rounded-lg transition-colors"
          >
            Try Beta Version
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/support')}
            className="px-6 py-3 bg-white/5 hover:bg-white/10
                     text-white rounded-lg transition-colors"
          >
            Contact Us
          </motion.button>
        </div>

        <div className="mt-12 inline-flex items-center gap-2 px-4 py-2
                      bg-violet-500/10 text-violet-400 rounded-full">
          <FiStar className="w-4 h-4" />
          <span className="text-sm font-medium">Currently in Beta - Free Access</span>
        </div>
      </motion.div>
    </div>
  );
}

export default PricingPage;
