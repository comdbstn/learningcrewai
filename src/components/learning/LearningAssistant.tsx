import React, { useState } from 'react';
import { askLearningAssistant, LearningAssistantResponse } from '../../services/openaiService';
import { useAuth } from '../../contexts/AuthContext';

interface LearningAssistantProps {
  currentTopic?: string;
}

export const LearningAssistant: React.FC<LearningAssistantProps> = ({ currentTopic }) => {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<LearningAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !question.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await askLearningAssistant(question, currentTopic);
      setResponse(result);
    } catch (err) {
      setError('질문에 대한 응답을 생성하는 중 오류가 발생했습니다.');
      console.error('학습 도우미 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="학습에 대해 질문해보세요..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? '응답 생성 중...' : '질문하기'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div className="prose max-w-none">
            <p>{response.content}</p>
          </div>

          {response.suggestions && response.suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">추천사항</h3>
              <ul className="list-disc list-inside space-y-1">
                {response.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {response.resources && response.resources.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">추천 학습 자료</h3>
              <ul className="list-disc list-inside space-y-1">
                {response.resources.map((resource, index) => (
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