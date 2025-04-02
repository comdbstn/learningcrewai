import React, { useState } from 'react';
import { summarizeLearningContent, LearningAssistantResponse } from '../../services/openaiService';
import { useAuth } from '../../contexts/AuthContext';

interface ContentSummarizerProps {
  content: string;
}

export const ContentSummarizer: React.FC<ContentSummarizerProps> = ({ content }) => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<LearningAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await summarizeLearningContent(content);
      setSummary(result);
    } catch (err) {
      setError('학습 자료 요약 중 오류가 발생했습니다.');
      console.error('학습 자료 요약 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">학습 자료 요약</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">원본 내용</h3>
        <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
          <p>{content}</p>
        </div>
      </div>

      <button
        onClick={handleSummarize}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? '요약 중...' : '요약하기'}
      </button>

      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">요약 내용</h3>
            <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
              <p>{summary.content}</p>
            </div>
          </div>

          {summary.suggestions && summary.suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">추가 설명</h3>
              <ul className="list-disc list-inside space-y-1">
                {summary.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {summary.resources && summary.resources.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">관련 자료</h3>
              <ul className="list-disc list-inside space-y-1">
                {summary.resources.map((resource, index) => (
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