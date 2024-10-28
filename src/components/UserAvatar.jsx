import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM4QjVDRjYiLz48cGF0aCBkPSJNMTIgMTNjMi43NjEgMCA1LTIuMjM5IDUtNXMtMi4yMzktNS01LTUtNSAyLjIzOS01IDUgMi4yMzkgNSA1IDV6bTAgMmMtMy4zMTUgMC02IDIuNjg1LTYgNnMxMiAwIDEyIDBjMC0zLjMxNS0yLjY4NS02LTYtNnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';

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
