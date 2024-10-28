import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiStar } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';

function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    // TODO: Implement subscription logic
    console.log(`Subscribing to ${plan} plan`);
  };

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      features: [
        "Up to 100 notes",
        "Basic formatting",
        "Mobile app access",
        "5GB storage",
        "Email support"
      ],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "9.99",
      description: "Best for power users",
      features: [
        "Unlimited notes",
        "Advanced formatting",
        "Priority support",
        "100GB storage",
        "Collaboration features",
        "Custom templates",
        "API access"
      ],
      buttonText: "Subscribe",
      highlighted: true
    }
  ];

  return (
    <PageLayout
      title="Simple, transparent pricing"
      description="Choose the plan that's right for you"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-[--bg-secondary] rounded-xl p-8 border
                ${plan.highlighted
                  ? 'border-violet-500/50 shadow-lg shadow-violet-500/10'
                  : 'border-white/10'}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-violet-500 text-white text-sm px-3 py-1 rounded-full
                                 flex items-center gap-1">
                    <FiStar className="w-4 h-4" />
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <FiCheck className="text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200
                  ${plan.highlighted
                    ? 'bg-violet-500 hover:bg-violet-600 text-white'
                    : 'bg-white/5 hover:bg-white/10'}`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default PricingPage;
