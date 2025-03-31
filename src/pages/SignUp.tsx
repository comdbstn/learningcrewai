import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    learningStyle: 'visual', // Default value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) return '이메일을 입력해주세요.';
    if (!formData.password) return '비밀번호를 입력해주세요.';
    
    if (!isLogin) {
      if (!formData.name) return '이름을 입력해주세요.';
      if (formData.password !== formData.confirmPassword) return '비밀번호가 일치하지 않습니다.';
    }
    
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          learningPreferences: {
            style: formData.learningStyle
          }
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '계정 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full floating"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-indigo-500/10 rounded-full floating-reverse" style={{animationDelay: '-1.5s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full floating" style={{animationDelay: '-0.75s'}}></div>
      </div>
      
      <div className="max-w-md w-full glass-effect rounded-2xl shadow-xl overflow-hidden border border-white/20">
        <div className="px-6 pt-8 pb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-elegant rounded-full p-3 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold mb-2">
            <span className="gradient-text">{isLogin ? '학습의 여정을 이어가세요' : '함께 성장할 준비가 되셨나요?'}</span>
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLogin ? '계정에 로그인하고 학습을 계속하세요' : 'LEARNING CREW.AI와 함께 맞춤형 학습을 시작하세요'}
          </p>
          
          {error && (
            <div className="mb-4 flex items-center p-4 text-sm text-red-600 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                  placeholder="홍길동"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                placeholder="example@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호 확인
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700 mb-1">
                    선호하는 학습 스타일
                  </label>
                  <select
                    id="learningStyle"
                    name="learningStyle"
                    value={formData.learningStyle}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                  >
                    <option value="visual">시각적 학습 (비디오, 이미지)</option>
                    <option value="auditory">청각적 학습 (오디오, 강의)</option>
                    <option value="reading">읽기 학습 (문서, 텍스트)</option>
                    <option value="kinesthetic">실습 학습 (실습, 활동)</option>
                  </select>
                </div>
              </>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 btn-gradient text-white text-sm font-medium rounded-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  <span className="flex items-center">
                    {isLogin ? '로그인' : '회원가입'} 
                    <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={toggleForm}
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium animate-underline"
            >
              {isLogin ? '계정이 없으신가요? 회원가입하기' : '이미 계정이 있으신가요? 로그인하기'}
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;