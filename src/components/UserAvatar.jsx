import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import defaultAvatar from '@/assets/default-avatar.jpeg';

const UserAvatar = ({ size = 'md' }) => {
  const { user } = useAuth();

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 border-violet-500/30`}>
      <img
        src={user?.avatar_url || defaultAvatar}
        alt={user?.email || 'User avatar'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;
