import { useState } from 'react';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
}

interface UserAvatarProps {
  user: User;
  onLogout: () => void;
}

export default function UserAvatar({ user, onLogout }: UserAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    onLogout();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full pl-1 pr-3 py-1 transition-colors"
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt="用户头像"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {(user.username || user.email).charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm text-gray-700 hidden sm:block">
          {user.username || user.email}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {user.username || user.email}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
}