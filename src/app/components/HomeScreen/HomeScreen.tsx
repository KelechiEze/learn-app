'use client';

import { ArrowRight, BookOpen, Calculator, Brain, Globe, BookText, Church, Wrench, Trophy, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import './HomeScreen.css';

interface HomeScreenProps {
  onStartLearning: (subject: string) => void;
  onStartQuiz: () => void;
  onViewScores: () => void;
}

const HomeScreen = ({ onStartLearning, onStartQuiz, onViewScores }: HomeScreenProps) => {
  const subjects = [
    { name: 'English', icon: BookOpen, color: '#FF6B6B' },
    { name: 'Mathematics', icon: Calculator, color: '#4ECDC4' },
    { name: 'Verbal Reasoning', icon: Brain, color: '#45B7D1' },
    { name: 'French', icon: Globe, color: '#96CEB4' },
    { name: 'Literature', icon: BookText, color: '#FFEAA7' },
    { name: 'CRS', icon: Church, color: '#DDA0DD' },
    { name: 'Vocational', icon: Wrench, color: '#FFB347' }
  ];

  return (
    <div className="home-screen">
      <div className="background-animation">
        <div className="floating-element element-1">⭐</div>
        <div className="floating-element element-2">🌟</div>
        <div className="floating-element element-3">✨</div>
        <div className="floating-element element-4">🎈</div>
        <div className="floating-element element-5">🦋</div>
      </div>

      <div className="container">
        <div className="header-section">
          <div className="character-image">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=face"
              alt="Learning Character"
              width={120}
              height={120}
              className="character-img"
              priority
            />
          </div>
          <h1 className="main-title">
            Welcome to <span className="gradient-text">Fun Learning!</span>
          </h1>
          <p className="subtitle">
            Choose a subject and let&apos;s start your amazing learning adventure! 🚀
          </p>
        </div>

        <div className="subjects-grid">
          {subjects.map((subject, index) => {
            const IconComponent = subject.icon;
            return (
              <div
                key={subject.name}
                className="subject-card"
                style={{ '--delay': `${index * 0.1}s`, '--color': subject.color } as React.CSSProperties}
                onClick={() => onStartLearning(subject.name)}
              >
                <div className="subject-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="subject-name">{subject.name}</h3>
                <div className="arrow-icon">
                  <ArrowRight size={20} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="quiz-section">
          <div className="quiz-container">
            <div className="quiz-card" onClick={onStartQuiz}>
              <div className="quiz-icon">
                <Trophy size={40} />
              </div>
              <div className="quiz-content">
                <h3 className="quiz-title">Take Quiz</h3>
                <p className="quiz-description">Test your knowledge across all subjects! 🎯</p>
              </div>
            </div>

            <div className="scores-card" onClick={onViewScores}>
              <div className="scores-icon">
                <BarChart3 size={40} />
              </div>
              <div className="scores-content">
                <h3 className="scores-title">Past Scores</h3>
                <p className="scores-description">View your quiz history 📊</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-message">
          <p>🎉 Ready to become a super learner? Pick your favorite subject!</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
