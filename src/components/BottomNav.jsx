import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Star } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <NavLink to="/home" className={({ isActive }) => 
          `p-4 text-center ${isActive ? 'text-blue-500' : ''}`
        }>
          <Home className="mx-auto" />
          <span className="text-xs">ホーム</span>
        </NavLink>
        <NavLink to="/reviews" className={({ isActive }) => 
          `p-4 text-center ${isActive ? 'text-blue-500' : ''}`
        }>
          <Star className="mx-auto" />
          <span className="text-xs">レビュー</span>
        </NavLink>
        <NavLink to="/account" className={({ isActive }) => 
          `p-4 text-center ${isActive ? 'text-blue-500' : ''}`
        }>
          <User className="mx-auto" />
          <span className="text-xs">アカウント</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;