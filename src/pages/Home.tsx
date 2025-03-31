import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Clock, Users, ChevronRight, Sparkles, BookOpen, Trophy, ArrowRight, Star, Zap, BarChart } from 'lucide-react';

const Home = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    
    const featureElements = featuresRef.current?.querySelectorAll('.feature-card');
    featureElements?.forEach(el => observer.observe(el));
    
    const processElements = processRef.current?.querySelectorAll('.process-card');
    processElements?.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI 기반 맞춤형 학습",
      description: "고급 AI 알고리즘으로 개인화된 학습 경로를 제공합니다"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "스마트 목표 설정",
      description: "지능형 추적 시스템으로 학습 목표를 달성하세요"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "유연한 학습 일정",
      description: "당신의 라이프스타일에 맞는 최적화된 학습 일정"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "커뮤니티 학습",
      description: "다른 학습자들과 함께 효과적으로 학습하세요"
    }
  ];

  const stats = [
    { value: "95%", label: "만족도", icon: <Star className="h-5 w-5" /> },
    { value: "2.5x", label: "학습 효율", icon: <Zap className="h-5 w-5" /> },
    { value: "87%", label: "목표 달성률", icon: <BarChart className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-subtle overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-90"></div>
        </div>
        <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
                <span className="block text-gray-900">AI가 제시하는</span>
                <span className="block gradient-text mt-2">맞춤형 학습의 미래</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-500">
                LEARNING CREW.AI와 함께 개인화된 학습 여정을 시작하세요.
                AI 기반 맞춤형 학습으로 당신의 성장을 가속화합니다.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-white btn-gradient pulse-effect hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  무료로 시작하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-gray-600 glass-effect hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
                >
                  더 알아보기
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-500/20 rounded-full floating"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-500/20 rounded-full floating-reverse" style={{animationDelay: '-1.5s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full floating" style={{animationDelay: '-0.75s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-cyan-500/20 rounded-full floating-reverse" style={{animationDelay: '-2s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-pink-500/10 rounded-full floating" style={{animationDelay: '-1.2s'}}></div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-gradient-elegant">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 text-center text-white border-b md:border-b-0 md:border-r border-white/10 last:border-0">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-white/20 p-2 rounded-full mr-2">
                      {stat.icon}
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-blue-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white" id="features" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              AI 기반 맞춤형 학습의 <span className="gradient-text-alt">새로운 기준</span>
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              LEARNING CREW.AI만의 특별한 기능을 경험해보세요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card hover-card bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-12 w-12 bg-gradient-elegant rounded-xl flex items-center justify-center mb-6">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24 bg-gradient-subtle" ref={processRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            LEARNING CREW.AI의 <span className="gradient-text">학습 프로세스</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "1. 학습 스타일 분석",
                description: "AI가 당신의 학습 성향과 목표를 분석하여 최적의 학습 경로를 설계합니다."
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "2. 맞춤형 학습",
                description: "개인화된 커리큘럼으로 효율적인 학습을 진행하며 실시간 피드백을 받습니다."
              },
              {
                icon: <Trophy className="h-8 w-8" />,
                title: "3. 성과 달성",
                description: "데이터 기반 학습 분석으로 목표를 달성하고 지속적인 성장을 이룹니다."
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="process-card glass-effect p-8 rounded-2xl shadow-sm opacity-0 translate-y-8 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center text-white pulse-effect">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-elegant py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect-dark rounded-3xl p-12 flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                미래의 학습을 경험할 준비가 <span className="gradient-text-alt">되셨나요?</span>
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                AI 기반 맞춤형 학습으로 당신의 성장을 가속화하세요.
              </p>
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-indigo-600 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 pulse-effect"
            >
              무료로 시작하기
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;