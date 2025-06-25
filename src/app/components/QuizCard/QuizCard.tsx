'use client';

import { ArrowLeft, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import './QuizCard.css';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  onBackToHome: () => void;
}

const QuizCard = ({ 
  question, 
  onAnswer, 
  questionNumber, 
  totalQuestions, 
  onBackToHome 
}: QuizCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.6;
      utterance.pitch = 1.4;
      
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('hazel') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('samantha') ||
        (voice.name.toLowerCase().includes('google') && voice.name.toLowerCase().includes('female'))
      );
      
      utterance.voice = femaleVoice || voices.find(voice => voice.lang.includes('en')) || voices[0];
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setTimeout(() => {
      speakText(question.question);
    }, 500);
  }, [question.question, question.id]);

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    const isCorrect = optionIndex === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 2000);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="quiz-screen">
      <div className="quiz-background">
        <div className="animated-bg-element quiz-bg-1">🧠</div>
        <div className="animated-bg-element quiz-bg-2">📝</div>
        <div className="animated-bg-element quiz-bg-3">⭐</div>
      </div>

      <div className="quiz-container">
        <div className="quiz-header">
          <button className="back-button" onClick={onBackToHome}>
            <ArrowLeft size={24} />
          </button>
          <div className="subject-badge">Mixed Quiz</div>
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

        <div className="quiz-content">
          <div className="question-section">
            <h2 className="question-text">{question.question}</h2>
            <p className="subject-tag">Subject: {question.subject}</p>
          </div>

          <div className="options-section">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === index ? 'selected' : ''
                } ${
                  showResult && index === question.correctAnswer ? 'correct' : ''
                } ${
                  showResult && selectedOption === index && index !== question.correctAnswer ? 'incorrect' : ''
                }`}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="result-icon correct-icon" size={24} />
                )}
                {showResult && selectedOption === index && index !== question.correctAnswer && (
                  <XCircle className="result-icon incorrect-icon" size={24} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
