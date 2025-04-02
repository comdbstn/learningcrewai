import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClasses = (path: string) => `
    relative animate-underline transition-colors
    ${location.pathname === path 
      ? 'text-blue-600 font-medium' 
      : 'text-gray-600 hover:text-blue-600'
    }
  `;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className={`
                p-2 rounded-lg transition-all duration-300 
                ${isScrolled ? 'bg-blue-50' : 'bg-white/30'}
                group-hover:bg-gradient-elegant group-hover:scale-110
              `}>
                <GraduationCap className="h-7 w-7 text-blue-600 group-hover:text-white" />
              </div>
              <span className="ml-2 text-xl font-bold gradient-text">
                LEARNING CREW.AI
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/service" className={navLinkClasses('/service')}>
              서비스 소개
            </Link>
            <Link to="/learning-path" className={navLinkClasses('/learning-path')}>
              학습 과정
            </Link>
            <Link to="/ai-assistant" className={navLinkClasses('/ai-assistant')}>
              AI 학습 도우미
            </Link>
            <Link to="/community" className={navLinkClasses('/community')}>
              커뮤니티
            </Link>
            <Link to="/support" className={navLinkClasses('/support')}>
              고객지원
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className={navLinkClasses('/dashboard')}>
                  대시보드
                </Link>
                <button
                  onClick={signOut}
                  className="btn-gradient text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-indigo-600 border border-indigo-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-indigo-50 transition-all duration-300"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="btn-gradient text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  무료로 시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-gray-200 animate-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/service" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/service' 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              서비스 소개
            </Link>
            <Link 
              to="/learning-path" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/learning-path' 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              학습 과정
            </Link>
            <Link 
              to="/ai-assistant" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/ai-assistant' 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              AI 학습 도우미
            </Link>
            <Link 
              to="/community" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/community' 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              커뮤니티
            </Link>
            <Link 
              to="/support" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/support' 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              고객지원
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/dashboard' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  대시보드
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left mt-2 bg-gradient-elegant text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full text-left mt-2 border border-indigo-600 text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-left mt-2 bg-gradient-elegant text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  무료로 시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;