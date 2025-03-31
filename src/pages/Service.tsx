import React from 'react';
import { Brain, Target, Clock, Users, Shield, Zap, BookOpen, Trophy } from 'lucide-react';

const Service = () => {
  const features = [
    {
      icon: <Brain className="h-12 w-12" />,
      title: "AI 기반 학습 분석",
      description: "개인의 학습 패턴과 선호도를 분석하여 최적화된 학습 경로를 제시합니다."
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "맞춤형 커리큘럼",
      description: "각 학습자의 목표와 수준에 맞는 개별화된 학습 내용을 제공합니다."
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "실시간 피드백",
      description: "학습 과정에서 즉각적인 피드백을 제공하여 효율적인 학습을 돕습니다."
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "협업 학습",
      description: "다른 학습자들과의 상호작용을 통해 더 깊이 있는 학습을 경험합니다."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">더 스마트한 학습을 위한</span>
              <span className="block text-blue-600 mt-2">AI 기반 학습 플랫폼</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              LEARNING CREW.AI는 최신 AI 기술을 활용하여 각 학습자에게 최적화된
              학습 경험을 제공합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="hover-card bg-white p-8 rounded-2xl border border-gray-100">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              LEARNING CREW.AI의 특별한 장점
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "검증된 학습 방법",
                description: "교육 전문가들이 설계한 커리큘럼으로 효과적인 학습을 보장합니다."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "빠른 성장",
                description: "AI 기반 개인화로 학습 효율을 극대화하여 빠른 성장을 돕습니다."
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "풍부한 콘텐츠",
                description: "다양한 분야의 고품질 학습 자료를 제공합니다."
              }
            ].map((benefit, index) => (
              <div key={index} className="hover-card bg-white p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                AI 기반 맞춤형 학습으로 당신의 성장을 가속화하세요
              </p>
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-blue-600 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                무료로 시작하기
                <Trophy className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;