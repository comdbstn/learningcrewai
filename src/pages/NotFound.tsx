import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            404 - 페이지를 찾을 수 없습니다
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 