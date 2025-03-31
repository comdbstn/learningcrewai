import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, HelpCircle, FileText, ChevronDown, Search } from 'lucide-react';

const Support = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'general',
      question: '학습 크루 AI는 어떤 서비스인가요?',
      answer: '학습 크루 AI는 인공지능 기술을 활용하여 개인 맞춤형 학습 경험을 제공하는 교육 플랫폼입니다. 각 학습자의 수준과 목표에 맞는 최적화된 학습 경로를 제시하고, 실시간 피드백을 통해 효과적인 학습을 지원합니다.'
    },
    {
      category: 'payment',
      question: '결제는 어떻게 이루어지나요?',
      answer: '신용카드, 계좌이체 등 다양한 결제 방식을 지원합니다. 월간 구독 방식으로 운영되며, 첫 한 달은 무료로 체험하실 수 있습니다.'
    },
    {
      category: 'technical',
      question: '기술적인 문제가 발생했을 때 어떻게 해결하나요?',
      answer: '고객지원 페이지에서 문제 해결 가이드를 확인하실 수 있으며, 실시간 채팅 상담을 통해 즉각적인 도움을 받으실 수 있습니다.'
    },
    {
      category: 'learning',
      question: '학습 진도는 어떻게 관리되나요?',
      answer: '대시보드를 통해 학습 진도와 성과를 실시간으로 확인할 수 있습니다. AI가 학습 패턴을 분석하여 최적의 학습 계획을 추천해드립니다.'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: '실시간 채팅',
      description: '평일 09:00-18:00',
      action: '채팅 시작하기'
    },
    {
      icon: Phone,
      title: '전화 상담',
      description: '1544-0000',
      action: '전화하기'
    },
    {
      icon: Mail,
      title: '이메일 문의',
      description: 'support@learningcrew.ai',
      action: '이메일 보내기'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            무엇을 도와드릴까요?
          </h1>
          <p className="text-xl text-gray-600">
            학습 크루 AI 고객지원 센터입니다.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="궁금하신 내용을 검색해보세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <method.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              </div>
              <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">자주 묻는 질문</h2>
            <div className="flex space-x-4">
              {['all', 'general', 'payment', 'technical', 'learning'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all' ? '전체' :
                   category === 'general' ? '일반' :
                   category === 'payment' ? '결제' :
                   category === 'technical' ? '기술' : '학습'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 group-open:transform group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Help Center */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            더 자세한 도움이 필요하신가요?
          </h2>
          <p className="text-blue-100 mb-6">
            헬프 센터에서 자세한 가이드와 튜토리얼을 확인하실 수 있습니다.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            헬프 센터 방문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;