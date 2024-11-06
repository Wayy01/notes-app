import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheck,
  FiGithub,
  FiFolder,
  FiEdit3,
  FiShare2,
  FiLock,
  FiSmartphone,
  FiCloud,
  FiCommand,
  FiLayout,
  FiGrid,
  FiPlay,
  FiChevronDown,
  FiSettings,
  FiLogOut,
  FiTwitter,
  FiLinkedin,
  FiStar,
  FiMessageCircle,
  FiAward,
  FiUser,
  FiX,
  FiMenu
} from 'react-icons/fi';
import { ParticleBackground as AnimatedBackground } from '../components/ParticleBackground';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Logo } from '../components/Logo';
import defaultAvatar from '../assets/default-avatar.jpeg'; // Make sure to add this image to your assets
import UserMenu from '@/components/UserMenu';
import Navigation from '@/components/Navigation';

function LandingPage() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Move these arrays to the top of the component
  const betaFeatures = [
    "Early access to all features",
    "Help shape the product",
    "Community access",
    "Basic support",
    "Limited-time beta badge"
  ];

  const supporterFeatures = [
    "All Beta features",
    "Priority support",
    "Early supporter badge",
    "Private Discord channel",
    "Name in credits",
    "Exclusive updates",
    "Future premium features"
  ];

  const betaBenefits = [
    {
      icon: <FiStar className="text-violet-400" size={24} />,
      title: "Early Access",
      description: "Be among the first to try new features and shape the future of Notecraft."
    },
    {
      icon: <FiMessageCircle className="text-fuchsia-400" size={24} />,
      title: "Direct Feedback",
      description: "Your feedback directly influences the development of new features."
    },
    {
      icon: <FiAward className="text-pink-400" size={24} />,
      title: "Exclusive Benefits",
      description: "Get special perks and recognition as an early supporter."
    }
  ];

  const features = [
    {
      icon: <FiLayout className="text-violet-400" size={24} />,
      title: "Beautiful Interface",
      description: "A minimalist design that lets you focus on what matters - your notes and ideas.",
      gradient: "from-violet-500/20 to-fuchsia-500/20",
      delay: 0
    },
    {
      icon: <FiLock className="text-fuchsia-400" size={24} />,
      title: "End-to-End Encrypted",
      description: "Your notes are secured with military-grade encryption. Only you can access your data.",
      gradient: "from-fuchsia-500/20 to-pink-500/20",
      delay: 0.1
    },
    {
      icon: <FiGrid className="text-pink-400" size={24} />,
      title: "Smart Organization",
      description: "AI-powered organization that learns from your usage. Find anything instantly.",
      gradient: "from-pink-500/20 to-rose-500/20",
      delay: 0.2
    }
  ];

  const additionalFeatures = [
    {
      icon: <FiCommand className="text-violet-400" size={20} />,
      title: "Command Palette",
      description: "Quick actions and navigation with keyboard shortcuts. Access everything without leaving your keyboard."
    },
    {
      icon: <FiShare2 className="text-violet-400" size={20} />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time. Share notes and folders with granular permission controls."
    }
  ];

  // Add new animations configuration
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  // Add floating animation variants
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Updated Hero Section
  const heroSection = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-white/20 rounded-full"
              initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                transition: {
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-7xl font-bold tracking-tight">
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Where Ideas
            </span>
            <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
              Take Flight
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            A modern note-taking experience designed for creators, thinkers, and dreamers.
            Transform your thoughts into reality with powerful tools and elegant design.
          </p>

          {/* CTA Buttons with enhanced hover effects */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
          >
            <Link
              to="/signup"
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl
                         overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0
                            group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <span className="relative flex items-center">
                Start Your Journey
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href="#demo"
              className="group px-8 py-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10
                         transition-all duration-300 hover:scale-105 hover:border-white/20"
            >
              <span className="flex items-center">
                Watch Demo
                <FiPlay className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* App Preview with floating animation */}
        <motion.div
          className="mt-20 relative max-w-5xl mx-auto"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
        >
          {/* Preview Window with enhanced styling */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10
                         bg-gradient-to-br from-[#1a1a2e] to-[#12121A] backdrop-blur-xl p-8 shadow-2xl">
            {/* ... existing preview content ... */}
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -right-12 top-20 bg-[#1E1E2E]/90 rounded-lg p-4 shadow-xl"
            animate={{
              y: [-10, 10],
              rotate: [-2, 2],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            {/* Code snippet content */}
          </motion.div>

          <motion.div
            className="absolute -left-12 bottom-20 bg-[#1E1E2E]/90 rounded-lg p-4 shadow-xl"
            animate={{
              y: [-10, 10],
              rotate: [-2, 2],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }
            }}
          >
            {/* Command palette content */}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Features section with enhanced animations and design
  const featuresSection = (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
            }}
          >
            Crafted for Productivity
          </motion.h2>
          <motion.p
            className="text-xl text-white/60 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
            }}
          >
            Every feature is designed to help you capture, organize, and develop your ideas with ease.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    duration: 0.8,
                    delay: feature.delay
                  }
                }
              }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Feature Card */}
              <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 h-full
                            backdrop-blur-xl transition-all duration-300
                            hover:border-violet-500/30 hover:bg-white/[0.05]">
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${feature.gradient}
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6
                                group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-transparent
                              rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Feature Highlights */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.4,
                staggerChildren: 0.1
              }
            }
          }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="group"
            >
              <div className="relative p-6 rounded-xl bg-white/[0.02] border border-white/5
                            hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h4>
                    <p className="text-white/60 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );

  // FAQ Section
  const faqSection = (
    <section id="faq" className="relative py-20">
      <div className="absolute inset-0">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to know about our service
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 }
                }
              }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6
                            hover:bg-white/[0.05] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3 text-white/90">
                  {faq.question}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  // Scroll handling for navigation
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80; // Height of your fixed navigation
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  // Updated Navigation with conditional rendering
  const navigation = (
    <nav className="fixed w-full z-50 bg-[#12121A]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Navigation Links - Different for logged in users */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              // Logged in user navigation
              <>
                <Link
                  to="/dashboard"
                  className="text-white/70 hover:text-white transition-colors relative group"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    Dashboard
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </>
            ) : (
              // Non-logged in user navigation
              <>
                {[
                  { name: 'Features', id: 'features' },
                  { name: 'Support', id: 'support' },
                  { name: 'FAQ', id: 'faq' }
                ].map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/70 hover:text-white transition-colors relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400 group-hover:w-full transition-all duration-300" />
                  </motion.button>
                ))}
              </>
            )}
          </div>

          {/* Auth Buttons - Different for logged in users */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg
                           border border-white/10 hover:border-white/20 bg-white/5"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500
                           hover:from-violet-500 hover:to-violet-400 text-white rounded-lg
                           transition-all duration-300 shadow-lg shadow-violet-500/25
                           hover:shadow-violet-500/40 border border-violet-400/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white
                     hover:bg-white/5 transition-colors border border-white/10"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu with conditional rendering */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/20 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-4">
              {user ? (
                // Logged in mobile menu
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-white/70 hover:text-white
                           hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                // Non-logged in mobile menu
                <>
                  {['Features', 'Support', 'FAQ'].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        scrollToSection(item.toLowerCase());
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-white/70
                               hover:text-white hover:bg-white/5 rounded-lg
                               transition-colors"
                    >
                      {item}
                    </motion.button>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-white/70 hover:text-white
                               hover:bg-white/5 rounded-lg transition-colors
                               border border-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 bg-gradient-to-r from-violet-600
                               to-violet-500 hover:from-violet-500 hover:to-violet-400
                               text-white rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  // Updated Pricing/Support Section
  const supportSection = (
    <section id="support" className="relative py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 via-transparent to-transparent" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full text-sm font-medium text-violet-400 inline-block mb-4">
            BETA PROGRAM
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Support the Development
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Join our beta program and help shape the future of Notecraft
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Beta Access */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="relative p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl
                          hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-500/20 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4">Free Beta Access</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-white/60">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {betaFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-white/80">
                      <FiCheck className="mr-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/10
                                hover:bg-white/10 transition-all duration-300">
                  Join Beta
                </button>
              </div>
            </div>
          </motion.div>

          {/* Early Supporter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-xl" />
            <div className="relative p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl
                          hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r
                            from-violet-600 to-fuchsia-600 rounded-full text-sm font-medium">
                Support Us ❤️
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4">Early Supporter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="text-white/60">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {supporterFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-white/80">
                      <FiCheck className="mr-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600
                                hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300
                                group-hover:shadow-lg group-hover:shadow-violet-500/25">
                  Become a Supporter
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Beta Program Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-white/90">Beta Program Benefits</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {betaBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                              flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-medium mb-2">{benefit.title}</h4>
                <p className="text-white/60">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Updated Footer with new logo
  const footer = (
    <footer className="relative pt-24 pb-12 border-t border-white/10">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <Logo className="mb-4" />
            <p className="text-sm text-white/60 max-w-xs">
              Craft your thoughts into beautiful notes with our modern note-taking experience.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-sm font-semibold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-white/40 text-sm">
            © 2024 Notecraft. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <FiTwitter size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <FiLinkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );

  // Add this after the featuresSection constant and before the faqSection
  const betaSection = (
    <section className="relative py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full text-sm font-medium text-violet-400 inline-block mb-4">
            BETA ACCESS
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Join Our Beta Program
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Be among the first to experience our innovative note-taking platform and help shape its future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Early Access",
              description: "Get exclusive access to new features before they're publicly released.",
              icon: FiStar
            },
            {
              title: "Direct Feedback",
              description: "Your feedback directly influences the development of new features.",
              icon: FiMessageCircle
            },
            {
              title: "Special Perks",
              description: "Receive special benefits and discounts as a beta tester.",
              icon: FiAward
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <feature.icon className="w-8 h-8 text-violet-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors duration-200"
          >
            Join Beta Program
            <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      <AnimatedBackground />

      <Navigation
        landingPage
        scrollToSection={scrollToSection}
        sections={[
          { name: 'Features', id: 'features' },
          { name: 'Support', id: 'support' },
          { name: 'FAQ', id: 'faq' }
        ]}
      />

      {/* Hero Section */}
      {heroSection}

      {/* Features Section */}
      {featuresSection}

      {/* Beta Section */}
      {betaSection}

      {/* FAQ Section */}
      {faqSection}

      {/* Footer */}
      {footer}
    </div>
  );
}

// Add these arrays at the top of your file
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
  // Add more FAQs as needed
];

const freePlanFeatures = [
  "Up to 100 notes",
  "Basic formatting",
  "Mobile app access",
  "5GB storage",
  "Email support"
];

const proPlanFeatures = [
  "Unlimited notes",
  "Advanced formatting",
  "Priority support",
  "100GB storage",
  "Collaboration features",
  "Custom templates",
  "API access"
];

const footerSections = [
  {
    title: "Product",
    links: [
      { text: "Features", href: "#features" },
      { text: "Pricing", href: "#pricing" },
      { text: "Security", href: "#security" }
    ]
  },
  // Add more footer sections as needed
];

export default LandingPage;
