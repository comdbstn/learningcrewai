import React, { useState } from 'react';
import { LearningAssistant } from '../components/learning/LearningAssistant';
import { LearningProgressAnalyzer } from '../components/learning/LearningProgressAnalyzer';
import { ContentSummarizer } from '../components/learning/ContentSummarizer';
import { NavBar } from '../components/layout/NavBar';

// 탭 타입 정의
type TabType = 'assistant' | 'analyzer' | 'summarizer';

export const AIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('assistant');
  
  // 샘플 데이터 - 실제 데이터는 DB에서 가져오게 됩니다
  const sampleCompletedTopics = ['HTML 기초', 'CSS 기초', 'JavaScript 변수와 함수'];
  const sampleCurrentTopic = 'JavaScript DOM 조작';
  const sampleTimeSpent = 12;
  const sampleQuizScores = [80, 92, 75];
  const sampleContent = `JavaScript는 웹 페이지에서 복잡한 기능을 구현할 수 있게 해주는 프로그래밍 언어입니다.
  
HTML이 웹 페이지의 구조를 만들고, CSS가 스타일을 담당한다면, JavaScript는 웹 페이지의 동작을 담당합니다.

JavaScript의 특징:
- 클라이언트 측 스크립트 언어
- 객체 기반 프로그래밍 언어
- 이벤트 기반 프로그래밍 지원
- DOM(Document Object Model) 조작 가능
- 웹 API 활용을 통한 다양한 기능 구현

JavaScript의 기본 문법:
1. 변수 선언: var, let, const
2. 데이터 타입: String, Number, Boolean, Array, Object 등
3. 함수 정의와 호출
4. 조건문과 반복문
5. 이벤트 처리

JavaScript 프레임워크와 라이브러리:
- React: 사용자 인터페이스 구축을 위한 라이브러리
- Angular: 구글이 개발한 프레임워크
- Vue.js: 점진적으로 적용 가능한 프레임워크
- jQuery: DOM 조작을 단순화한 라이브러리

JavaScript는 웹 개발에서 필수적인 언어로, 현대 웹 애플리케이션의 대부분은 JavaScript를 활용하여 개발됩니다.`;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">AI 학습 도우미</h1>
        
        {/* 탭 메뉴 */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'assistant'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('assistant')}
          >
            학습 도우미
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'analyzer'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('analyzer')}
          >
            학습 진도 분석
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'summarizer'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('summarizer')}
          >
            학습 자료 요약
          </button>
        </div>
        
        {/* 선택된 탭에 따른 컴포넌트 렌더링 */}
        <div className="mb-8">
          {activeTab === 'assistant' && (
            <LearningAssistant currentTopic={sampleCurrentTopic} />
          )}
          
          {activeTab === 'analyzer' && (
            <LearningProgressAnalyzer
              completedTopics={sampleCompletedTopics}
              currentTopic={sampleCurrentTopic}
              timeSpent={sampleTimeSpent}
              quizScores={sampleQuizScores}
            />
          )}
          
          {activeTab === 'summarizer' && (
            <ContentSummarizer content={sampleContent} />
          )}
        </div>
      </div>
    </div>
  );
}; 