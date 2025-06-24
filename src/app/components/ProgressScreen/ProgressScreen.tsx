
import { Home, RotateCcw, Target } from 'lucide-react';
import './ProgressScreen.css';

interface ProgressScreenProps {
  score: number;
  totalQuestions: number;
  subject: string;
  onBackToHome: () => void;
  onRetakeTest: () => void;
  questionType?: 'objective' | 'essay';
}

const ProgressScreen = ({ 
  score, 
  totalQuestions, 
  subject, 
  onBackToHome, 
  onRetakeTest,
  questionType = 'objective'
}: ProgressScreenProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (questionType === 'essay') {
      return "Fantastic! You completed all the essay questions! 🎉";
    }
    
    if (percentage >= 80) {
      return "Excellent work! You're a superstar! 🌟";
    } else if (percentage >= 60) {
      return "Good job! Keep practicing! 👍";
    } else {
      return "Great effort! Try again to improve! 💪";
    }
  };

  const getEmoji = () => {
    if (questionType === 'essay') return "📚";
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "⭐";
    return "💪";
  };

  return (
    <div className="progress-screen">
      <div className="progress-background">
        <div className="floating-celebration celebration-1">🎉</div>
        <div className="floating-celebration celebration-2">🌟</div>
        <div className="floating-celebration celebration-3">⭐</div>
        <div className="floating-celebration celebration-4">🎊</div>
        <div className="floating-celebration celebration-5">✨</div>
      </div>

      <div className="progress-container">
        <div className="result-card">
          <div className="result-header">
            <div className="subject-completed">
              <h1 className="completion-title">
                {questionType === 'essay' ? 'Essays' : 'Quiz'} Completed!
              </h1>
              <h2 className="subject-title">{subject}</h2>
            </div>
            
            <div className="performance-emoji">
              {getEmoji()}
            </div>
          </div>

          <div className="score-display">
            {questionType === 'objective' ? (
              <>
                <div className="score-circle">
                  <div className="score-text">
                    <span className="score-number">{score}</span>
                    <span className="score-divider">/</span>
                    <span className="total-number">{totalQuestions}</span>
                  </div>
                  <div className="score-label">Correct</div>
                </div>
                
                <div className="percentage-badge">
                  {percentage}%
                </div>
              </>
            ) : (
              <div className="essay-completion">
                <div className="completion-icon">
                  <Target size={60} />
                </div>
                <div className="completion-text">
                  All {totalQuestions} essay questions completed!
                </div>
              </div>
            )}
          </div>

          <div className="performance-message">
            <p>{getPerformanceMessage()}</p>
          </div>

          <div className="action-buttons">
            <button className="action-button home-button" onClick={onBackToHome}>
              <Home size={24} />
              <span>Back to Home</span>
            </button>
            
            <button className="action-button retry-button" onClick={onRetakeTest}>
              <RotateCcw size={24} />
              <span>{questionType === 'essay' ? 'Review Again' : 'Retake Quiz'}</span>
            </button>
          </div>

          <div className="achievement-section">
            <div className="achievement-text">
              🎯 Keep learning and growing! 🎯
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;