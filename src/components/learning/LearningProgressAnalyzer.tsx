import React, { useState } from 'react';
import { analyzeLearningProgress, LearningAssistantResponse } from '../../services/openaiService';
import { useAuth } from '../../contexts/AuthContext';

interface LearningProgressAnalyzerProps {
  completedTopics: string[];
  currentTopic: string;
  timeSpent: number;
  quizScores: number[];
}

export const LearningProgressAnalyzer: React.FC<LearningProgressAnalyzerProps> = ({
  completedTopics,
  currentTopic,
  timeSpent,
  quizScores,
}) => {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<LearningAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeLearningProgress({
        completedTopics,
        currentTopic,
        timeSpent,
        quizScores,
      });
      setAnalysis(result);
    } catch (err) {
      setError('학습 진도 분석 중 오류가 발생했습니다.');
      console.error('학습 진도 분석 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">학습 진도 분석</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">현재 학습 현황</h3>
        <ul className="space-y-2">
          <li>완료한 주제: {completedTopics.join(', ')}</li>
          <li>현재 학습 중인 주제: {currentTopic}</li>
          <li>총 학습 시간: {timeSpent}시간</li>
          <li>퀴즈 점수: {quizScores.join(', ')}</li>
        </ul>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? '분석 중...' : '진도 분석하기'}
      </button>

      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-6 space-y-4">
          <div className="prose max-w-none">
            <p>{analysis.content}</p>
          </div>

          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">개선 추천사항</h3>
              <ul className="list-disc list-inside space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.resources && analysis.resources.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">추천 학습 자료</h3>
              <ul className="list-disc list-inside space-y-1">
                {analysis.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 