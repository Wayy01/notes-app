import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import defaultAvatar from '@/assets/default-avatar.jpeg';

const UserAvatar = ({ size = 'md' }) => {
  const { user } = useAuth();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-violet-500/30`}>
      <img
        src={user?.avatar_url || defaultAvatar}
        alt={user?.email || 'User avatar'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;
