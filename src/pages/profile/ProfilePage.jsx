import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/UserAvatar';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <UserAvatar size="lg" />
          <div>
            <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || 'User'}</h1>
            <p className="text-white/50">{user?.email}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-[--bg-secondary] p-6 rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiUser className="text-violet-400" />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue={user?.user_metadata?.full_name}
                className="bg-[--bg-tertiary] border border-white/10 rounded-lg px-4 py-2 w-full"
                disabled
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
      </motion.div>
    </div>
  );
}

export default ProfilePage;
