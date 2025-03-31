import React, { useState } from 'react';
import { MessageSquare, Users, ThumbsUp, Share2, BookOpen, Search, Filter, TrendingUp } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const posts = [
    {
      id: 1,
      author: {
        name: '김지원',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badge: '파이썬 마스터'
      },
      title: '파이썬 기초 학습 후기 및 팁 공유',
      content: '2주 동안 파이썬 기초 과정을 공부하면서 느낀 점과 효과적인 학습 방법을 공유합니다.',
      tags: ['Python', '학습후기', '초보자팁'],
      likes: 24,
      comments: 8,
      shares: 3,
      timeAgo: '2시간 전'
    },
    {
      id: 2,
      author: {
        name: '이현수',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badge: '웹 개발자'
      },
      title: '웹 개발 스터디 멤버 모집합니다!',
      content: 'React와 Node.js를 함께 공부할 스터디원을 모집합니다. 주 2회 온라인 미팅을 진행할 예정입니다.',
      tags: ['React', 'Node.js', '스터디'],
      likes: 15,
      comments: 12,
      shares: 5,
      timeAgo: '4시간 전'
    },
    {
      id: 3,
      author: {
        name: '박서연',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badge: '데이터 사이언티스트'
      },
      title: '데이터 분석 프로젝트 성과 공유',
      content: '지난 한 달간 진행한 데이터 분석 프로젝트의 과정과 결과를 공유합니다.',
      tags: ['데이터분석', 'Python', '머신러닝'],
      likes: 42,
      comments: 15,
      shares: 8,
      timeAgo: '6시간 전'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              글쓰기
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="커뮤니티 검색하기"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              필터
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex space-x-4">
            {[
              { id: 'all', label: '전체', icon: BookOpen },
              { id: 'popular', label: '인기', icon: TrendingUp },
              { id: 'study', label: '스터디', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{post.author.name}</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {post.author.badge}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{post.timeAgo}</span>
                </div>
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-6 text-gray-500">
                <button className="flex items-center hover:text-blue-600">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center hover:text-blue-600">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center hover:text-blue-600">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;