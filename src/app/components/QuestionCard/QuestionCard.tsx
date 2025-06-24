'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, ArrowRight } from 'lucide-react';
import './QuestionCard.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  subject: string;
  onBackToHome: () => void;
}

const QuestionCard = ({ 
  question, 
  onAnswer, 
  questionNumber, 
  totalQuestions, 
  subject, 
  onBackToHome 
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1; // Increased from 0.8 to 1.1 for better speed
      utterance.pitch = 1.1; // Slightly reduced pitch from 1.2 to 1.1 for more natural sound
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Reset states when question changes
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setHasAnswered(false);
    
    // Auto-read question when component mounts
    speakText(question.question);
  }, [question.question, question.id]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setHasAnswered(true);

    // Speak the result
    if (correct) {
      speakText("Correct! Well done!");
    } else {
      speakText("Oops! That's not right. " + question.explanation);
    }
  };

  const handleNext = () => {
    if (!hasAnswered) return;
    onAnswer(isCorrect);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="question-screen">
      <div className="question-background">
        <div className="animated-bg-element bg-1">🌈</div>
        <div className="animated-bg-element bg-2">⚡</div>
        <div className="animated-bg-element bg-3">💫</div>
      </div>

      <div className="question-container">
        <div className="question-header">
          <button className="back-button" onClick={onBackToHome}>
            <ArrowLeft size={24} />
          </button>
          <div className="subject-badge">{subject}</div>
          <button className="speak-button" onClick={() => speakText(question.question)}>
            <Volume2 size={24} />
          </button>
        </div>

        <div className="progress-section">
          <div className="progress-text">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="question-content">
          <div className="character-section">
            <img 
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face" 
              alt="Teacher Character" 
              className="teacher-character"
            />
            <div className="speech-bubble">
              <h2 className="question-text">{question.question}</h2>
            </div>
          </div>

          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === index ? 'selected' : ''
                } ${
                  showResult && index === question.correctAnswer ? 'correct' : ''
                } ${
                  showResult && selectedAnswer === index && index !== question.correctAnswer ? 'incorrect' : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={hasAnswered}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <span className="result-icon">✅</span>
                )}
                {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="result-icon">❌</span>
                )}
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`result-section ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-icon-large">
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <div className="result-text">
                {isCorrect ? 'Excellent!' : 'Not quite right!'}
              </div>
              {!isCorrect && (
                <div className="explanation">
                  {question.explanation}
                </div>
              )}
            </div>
          )}

          {hasAnswered && (
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>
                <span>Next Question</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;