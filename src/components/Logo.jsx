import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Logo({ className = "" }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <motion.button
      onClick={handleLogoClick}
      className={`flex items-center gap-2 group ${className}`}
    >
      <motion.div
        className="relative w-10 h-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Logo mark content remains the same */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300" />
        <div className="absolute inset-[2px] bg-[#0A0A0F] rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-transparent bg-gradient-to-br from-violet-400 to-fuchsia-400 bg-clip-text"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
            <line x1="16" y1="8" x2="2" y2="22" />
            <line x1="17.5" y1="15" x2="9" y2="15" />
          </svg>
        </div>
      </motion.div>

      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Notecraft
        </span>
        <span className="text-xs text-white/50 tracking-wider">
          BETA
        </span>
      </div>
    </motion.button>
  );
}
