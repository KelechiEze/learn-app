'use client';

import { ArrowLeft, Trophy, Calendar, Target, Medal } from 'lucide-react';
import { useState, useEffect } from 'react';
import './ScoresScreen.css';

interface QuizScore {
  id: string;
  score: number;
  totalQuestions: number;
  date: string;
  percentage: number;
}

interface ScoresScreenProps {
  onBackToHome: () => void;
}

const ScoresScreen = ({ onBackToHome }: ScoresScreenProps) => {
  const [scores, setScores] = useState<QuizScore[]>([]);

  useEffect(() => {
    const savedScores = localStorage.getItem('quizScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#f44336';
  };

  const getPerformanceEmoji = (percentage: number) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '⭐';
    return '💪';
  };

  return (
    <div className="scores-screen">
      <div className="scores-background">
        <div className="floating-score score-1">🏆</div>
        <div className="floating-score score-2">⭐</div>
        <div className="floating-score score-3">📊</div>
        <div className="floating-score score-4">🎯</div>
      </div>

      <div className="scores-container">
        <div className="scores-header">
          <button className="back-button" onClick={onBackToHome}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="scores-title">
            <Trophy size={32} />
            Past Quiz Scores
          </h1>
        </div>

        <div className="scores-content">
          {scores.length === 0 ? (
            <div className="no-scores">
              <div className="no-scores-icon">📝</div>
              <h2>No Quiz Scores Yet!</h2>
              <p>Take your first quiz to see your scores here! 🌟</p>
            </div>
          ) : (
            <div className="scores-list">
              <div className="scores-summary">
                <div className="summary-card">
                  <Target size={24} />
                  <div>
                    <div className="summary-number">{scores.length}</div>
                    <div className="summary-label">Quizzes Taken</div>
                  </div>
                </div>
                <div className="summary-card">
                  <Medal size={24} />
                  <div>
                    <div className="summary-number">
                      {Math.round(scores.reduce((acc, score) => acc + score.percentage, 0) / scores.length)}%
                    </div>
                    <div className="summary-label">Average Score</div>
                  </div>
                </div>
              </div>

              {scores.map((score, index) => (
                <div key={score.id} className="score-card">
                  <div className="score-header">
                    <div className="score-badge">
                      <span className="quiz-number">Quiz #{scores.length - index}</span>
                      <span className="score-emoji">{getPerformanceEmoji(score.percentage)}</span>
                    </div>
                    <div className="score-date">
                      <Calendar size={16} />
                      {score.date}
                    </div>
                  </div>
                  
                  <div className="score-details">
                    <div className="score-numbers">
                      <span className="score-text">
                        {score.score}/{score.totalQuestions}
                      </span>
                      <span 
                        className="percentage-text"
                        style={{ color: getPerformanceColor(score.percentage) }}
                      >
                        {score.percentage}%
                      </span>
                    </div>
                    
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{ 
                          width: `${score.percentage}%`,
                          backgroundColor: getPerformanceColor(score.percentage)
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoresScreen;
