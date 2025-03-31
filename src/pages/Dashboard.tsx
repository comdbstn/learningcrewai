import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Award, Clock, TrendingUp, Calendar, BarChart, Book, CheckCircle, Trophy, Star, ArrowRight, Brain, Target, Users, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  nextLesson: string;
  category: string;
  difficulty: string;
  lastAccessed: string;
}

interface Task {
  id: number;
  task: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface Achievement {
  id: number;
  title: string;
  date: string;
  icon: string;
  description: string;
}

interface Notification {
  id: number;
  type: 'reminder' | 'achievement' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      // Simulated data for MVP
      setLearningPath({
        recommendedCourses: [
          { 
            id: 1, 
            title: '프로그래밍 기초',
            description: 'Python을 통한 프로그래밍 기초 학습',
            progress: 65,
            totalHours: 20,
            completedHours: 13,
            nextLesson: '함수와 메서드',
            category: '프로그래밍',
            difficulty: '초급',
            lastAccessed: '2025-04-02'
          },
          { 
            id: 2, 
            title: '자료구조와 알고리즘',
            description: '컴퓨터 과학의 핵심 개념 마스터',
            progress: 30,
            totalHours: 40,
            completedHours: 12,
            nextLesson: '이진 트리',
            category: '컴퓨터 과학',
            difficulty: '중급',
            lastAccessed: '2025-04-01'
          },
          { 
            id: 3, 
            title: '웹 개발 기초',
            description: '현대적인 웹 애플리케이션 구축',
            progress: 15,
            totalHours: 30,
            completedHours: 4.5,
            nextLesson: 'CSS 레이아웃',
            category: '웹 개발',
            difficulty: '초급',
            lastAccessed: '2025-04-03'
          }
        ],
        dailyGoal: '2시간',
        weeklyProgress: 8.5,
        weeklyGoal: 14,
        nextMilestone: '프로그래밍 기초 완료',
        upcomingDeadlines: [
          { id: 1, task: '프로그래밍 과제', due: '2025-04-05', priority: 'high', completed: false },
          { id: 2, task: '알고리즘 퀴즈', due: '2025-04-08', priority: 'medium', completed: false },
          { id: 3, task: 'CSS 실습 과제', due: '2025-04-10', priority: 'low', completed: false }
        ],
        achievements: [
          { 
            id: 1, 
            title: '첫 강좌 시작', 
            date: '2025-03-30',
            icon: 'star',
            description: '학습 여정의 시작을 축하합니다!'
          },
          { 
            id: 2, 
            title: '5일 연속 학습', 
            date: '2025-04-01',
            icon: 'trophy',
            description: '꾸준한 학습으로 목표를 달성하세요!'
          },
          {
            id: 3,
            title: '첫 과제 완료',
            date: '2025-04-02',
            icon: 'checkCircle',
            description: '실력 향상의 첫 걸음을 내딛었습니다!'
          }
        ],
        learningStats: {
          totalStudyTime: 45.5,
          completedLessons: 12,
          averageScore: 85,
          streakDays: 5
        }
      });

      setNotifications([
        {
          id: 1,
          type: 'reminder',
          message: '오늘의 학습 목표를 달성하세요! (1.5시간 남음)',
          timestamp: '방금 전',
          read: false
        },
        {
          id: 2,
          type: 'achievement',
          message: '축하합니다! 5일 연속 학습 달성!',
          timestamp: '1시간 전',
          read: false
        },
        {
          id: 3,
          type: 'system',
          message: '새로운 강의가 추가되었습니다: React 심화 과정',
          timestamp: '2시간 전',
          read: true
        }
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, [user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            학습 개요
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'progress'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            진도 관리
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'achievements'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            성과
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Bell className="h-6 w-6" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">알림</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      notification.read ? 'opacity-75' : ''
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      {notification.type === 'reminder' && <Clock className="h-5 w-5 text-blue-500 mr-3" />}
                      {notification.type === 'achievement' && <Trophy className="h-5 w-5 text-yellow-500 mr-3" />}
                      {notification.type === 'system' && <Bell className="h-5 w-5 text-gray-500 mr-3" />}
                      <div>
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              안녕하세요, {user?.name}님!
            </h2>
            <p className="mt-2 text-blue-100">
              오늘도 함께 성장하는 여정을 시작해볼까요?
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">주간 학습 진행률</p>
            <p className="text-3xl font-bold text-white">
              {learningPath.weeklyProgress}/{learningPath.weeklyGoal} 시간
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="hover-card bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">총 학습 시간</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {learningPath.learningStats.totalStudyTime}시간
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="hover-card bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">완료한 강의</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {learningPath.learningStats.completedLessons}개
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="hover-card bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">평균 점수</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {learningPath.learningStats.averageScore}점
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="hover-card bg-white overflow-hidden shadow-sm rounded-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">연속 학습</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {learningPath.learningStats.streakDays}일
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Path */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-6">학습 경로</h3>
          <div className="space-y-6">
            {learningPath.recommendedCourses.map((course: Course) => (
              <div key={course.id} className="hover-card bg-white shadow-sm rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-gray-500">{course.category}</span>
                      <span className="text-sm text-gray-500">난이도: {course.difficulty}</span>
                      <span className="text-sm text-gray-500">최근 접속: {course.lastAccessed}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {course.progress}% 완료
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-indigo-600"
                    ></div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">다음: {course.nextLesson}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">{course.completedHours}/{course.totalHours} 시간</span>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      계속하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Deadlines */}
          <div className="hover-card bg-white shadow-sm rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              예정된 일정
            </h3>
            <div className="space-y-4">
              {learningPath.upcomingDeadlines.map((deadline: Task) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deadline.completed}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium">{deadline.task}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">{deadline.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="hover-card bg-white shadow-sm rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-blue-600" />
              최근 성과
            </h3>
            <div className="space-y-4">
              {learningPath.achievements.map((achievement: Achievement) => (
                <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-gray-900 font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hover-card bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">빠른 시작</h3>
            <div className="space-y-3">
              <button className="w-full bg-white text-blue-600 rounded-lg px-4 py-2 font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300">
                다음 강의 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 font-medium flex items-center justify-center hover:bg-blue-400 transition-all duration-300">
                학습 일정 관리
                <Calendar className="ml-2 h-5 w-5" />
              </button>
              <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 font-medium flex items-center justify-center hover:bg-blue-400 transition-all duration-300">
                학습 통계 보기
                <BarChart className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;