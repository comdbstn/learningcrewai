import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Target, Users, Star, ArrowRight, Clock, Trophy } from 'lucide-react';

const LearningPath = () => {
  const paths = [
    {
      title: '프로그래밍 기초',
      description: 'Python을 통한 프로그래밍 기초 학습',
      duration: '8주',
      level: '입문',
      topics: ['Python 기초', '자료형과 변수', '제어문', '함수', '객체지향 프로그래밍'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '웹 개발 입문',
      description: 'HTML, CSS, JavaScript를 활용한 웹 개발 기초',
      duration: '12주',
      level: '초급',
      topics: ['HTML5', 'CSS3', 'JavaScript 기초', '반응형 웹 디자인', '웹 접근성'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '데이터 사이언스',
      description: '데이터 분석과 머신러닝 기초',
      duration: '16주',
      level: '중급',
      topics: ['통계 기초', 'pandas', 'numpy', '데이터 시각화', '머신러닝 입문'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">AI 기반</span>
              <span className="block text-blue-600 mt-2">맞춤형 학습 경로</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              개인의 수준과 목표에 맞춘 최적화된 학습 경로로
              효율적인 성장을 경험하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {paths.map((path, index) => (
              <div key={index} className="hover-card bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={path.image} 
                    alt={path.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {path.level}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    {path.duration}
                  </div>
                  <div className="space-y-2 mb-6">
                    {path.topics.map((topic, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        {topic}
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center">
                    학습 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              학습 경로의 특징
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: 'AI 기반 맞춤화',
                description: '개인의 학습 스타일과 속도에 맞춘 최적화된 커리큘럼'
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: '단계별 성장',
                description: '기초부터 심화까지 체계적인 학습 단계 제공'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: '실시간 피드백',
                description: '전문가와 동료들의 피드백을 통한 빠른 성장'
              }
            ].map((feature, index) => (
              <div key={index} className="hover-card bg-white p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                나만의 학습 여정을 시작하세요
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                AI가 추천하는 최적의 학습 경로로 목표를 달성하세요
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-blue-600 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                무료로 시작하기
                <Trophy className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;