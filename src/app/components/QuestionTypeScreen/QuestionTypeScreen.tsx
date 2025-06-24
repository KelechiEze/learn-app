import { BookOpen, PenTool, ArrowLeft } from 'lucide-react';
import './QuestionTypeScreen.css';

interface QuestionTypeScreenProps {
  selectedSubject: string;
  onSelectType: (type: 'objective' | 'essay') => void;
  onBackToHome: () => void;
}

const QuestionTypeScreen = ({ selectedSubject, onSelectType, onBackToHome }: QuestionTypeScreenProps) => {
  return (
    <div className="question-type-screen">
      <div className="type-background">
        <div className="floating-element type-1">📝</div>
        <div className="floating-element type-2">🎯</div>
        <div className="floating-element type-3">✏️</div>
        <div className="floating-element type-4">📚</div>
      </div>

      <div className="type-container">
        <div className="type-header">
          <button className="back-button" onClick={onBackToHome}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="type-title">
            Choose Your Learning Style for <span className="subject-highlight">{selectedSubject}</span>
          </h1>
        </div>

        <div className="type-options">
          <div className="type-card" onClick={() => onSelectType('objective')}>
            <div className="type-icon objective-icon">
              <BookOpen size={60} />
            </div>
            <h2 className="type-name">Multiple Choice</h2>
            <p className="type-description">
              Answer fun questions by choosing the correct option from multiple choices
            </p>
            <div className="type-features">
              <span>✓ Quick answers</span>
              <span>✓ Instant feedback</span>
              <span>✓ Score tracking</span>
            </div>
          </div>

          <div className="type-card" onClick={() => onSelectType('essay')}>
            <div className="type-icon essay-icon">
              <PenTool size={60} />
            </div>
            <h2 className="type-name">Essay Questions</h2>
            <p className="type-description">
              Listen to questions and learn detailed explanations with voice narration
            </p>
            <div className="type-features">
              <span>✓ Detailed explanations</span>
              <span>✓ Voice narration</span>
              <span>✓ Deep learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeScreen;
