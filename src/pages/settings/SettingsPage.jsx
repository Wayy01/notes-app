import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiBell, FiGlobe, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { notesAppDemo } from '@/assets';
import UserAvatar from '@/components/UserAvatar';

function SettingsPage() {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Section */}
        <div className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiUser className="text-violet-400" />
            Profile
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <UserAvatar size="lg" />
            <div>
              <h3 className="font-medium text-white/90">{user?.user_metadata?.full_name || 'User'}</h3>
              <p className="text-sm text-white/50">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue={user?.user_metadata?.full_name}
                className="bg-[--bg-tertiary] border border-white/10 rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="bg-[--bg-tertiary] border border-white/10 rounded-lg px-4 py-2 w-full"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiMoon className="text-violet-400" />
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white/90">Dark Mode</h3>
              <p className="text-sm text-white/50">Toggle dark/light theme</p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-white/50'
              }`}
            >
              {isDarkMode ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiBell className="text-violet-400" />
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white/90">Push Notifications</h3>
              <p className="text-sm text-white/50">Receive notifications about updates</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                notifications ? 'bg-violet-500' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  notifications ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiGlobe className="text-violet-400" />
            Language
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[--bg-tertiary] border border-white/10 rounded-lg px-4 py-2 w-full"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </motion.div>
    </div>
  );
}

export default SettingsPage;
