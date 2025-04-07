import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const NavBar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* 로고 및 메인 링크 */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              LEARNING CREW.AI
            </Link>
            
            {/* 메인 메뉴 아이템 */}
            <div className="hidden md:flex space-x-6">
              <Link to="/learning-paths" className="hover:text-blue-200">
                학습 경로
              </Link>
              <Link to="/courses" className="hover:text-blue-200">
                과정
              </Link>
              <Link to="/ai-assistant" className="hover:text-blue-200">
                AI 학습 도우미
              </Link>
              <Link to="/community" className="hover:text-blue-200">
                커뮤니티
              </Link>
            </div>
          </div>
          
          {/* 사용자 계정 및 알림 */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/notifications" className="hover:text-blue-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-blue-200">
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{user.email?.split('@')[0]}</span>
                  </button>
                  
                  {/* 드롭다운 메뉴 */}
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      프로필
                    </Link>
                    <Link to="/my-learning" className="block px-4 py-2 hover:bg-gray-100">
                      내 학습
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      설정
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 