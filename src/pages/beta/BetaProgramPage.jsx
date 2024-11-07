import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMessageCircle, FiAward } from 'react-icons/fi';

function BetaProgramPage() {
  const betaFeatures = [
    {
      icon: <FiStar className="text-violet-400" />,
      title: "Early Access",
      description: "Be among the first to try new features"
    },
    {
      icon: <FiMessageCircle className="text-fuchsia-400" />,
      title: "Direct Feedback",
      description: "Shape the future of the product"
    },
    {
      icon: <FiAward className="text-pink-400" />,
      title: "Beta Badge",
      description: "Exclusive beta tester recognition"
    }
  ];

  return (
    <div className="min-h-screen bg-[--bg-primary] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Beta Program</h1>
          <p className="text-gray-400">Join our beta program and help shape the future</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {betaFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10"
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BetaProgramPage;
