import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHelpCircle, FiMessageCircle, FiMail, FiChevronDown } from 'react-icons/fi';
import PageLayout from '@/layouts/PageLayout';

function SupportPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How secure is my data?",
      answer: "Your data is protected with end-to-end encryption. We use industry-standard security measures to ensure your notes remain private and secure."
    },
    {
      question: "Can I access my notes offline?",
      answer: "Yes, our app works offline. Your changes will sync automatically when you're back online."
    },
    {
      question: "Is there a limit to how many notes I can create?",
      answer: "Free users can create up to 100 notes. Pro users have unlimited note creation."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. You'll continue to have access to Pro features until the end of your billing period."
    }
  ];

  const supportChannels = [
    {
      icon: <FiMessageCircle className="w-6 h-6 text-violet-400" />,
      title: "Community Forum",
      description: "Get help from our community",
      link: "#"
    },
    {
      icon: <FiMail className="w-6 h-6 text-fuchsia-400" />,
      title: "Email Support",
      description: "Contact our support team",
      link: "mailto:support@example.com"
    },
    {
      icon: <FiHelpCircle className="w-6 h-6 text-pink-400" />,
      title: "Help Center",
      description: "Browse our documentation",
      link: "#"
    }
  ];

  return (
    <PageLayout
      title="Help & Support"
      description="Find answers to common questions or get in touch"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {supportChannels.map((channel, index) => (
            <motion.a
              key={channel.title}
              href={channel.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10
                       hover:border-white/20 transition-all duration-200"
            >
              <div className="mb-4">{channel.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
              <p className="text-gray-400">{channel.description}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[--bg-secondary] border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="font-medium">{faq.question}</span>
                <FiChevronDown
                  className={`w-5 h-5 transition-transform duration-200
                    ${openFaq === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default SupportPage;
