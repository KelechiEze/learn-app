'use client';

import { ArrowLeft, Volume2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './EssayCard.css';

interface EssayQuestion {
  id: number;
  question: string;
  answer: string;
}

interface EssayCardProps {
  question: EssayQuestion;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  subject: string;
  onBackToHome: () => void;
}

const EssayCard = ({
  question,
  onNext,
  questionNumber,
  totalQuestions,
  subject,
  onBackToHome
}: EssayCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

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
    setShowAnswer(false);
    setTimeout(() => {
      speakText(question.question);
    }, 500);
  }, [question.question, question.id]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setTimeout(() => {
      speakText(question.answer);
    }, 300);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="essay-screen">
      <div className="essay-background">
        <div className="animated-bg-element essay-bg-1">🌟</div>
        <div className="animated-bg-element essay-bg-2">📖</div>
        <div className="animated-bg-element essay-bg-3">✨</div>
      </div>

      <div className="essay-container">
        <div className="essay-header">
          <button className="back-button" onClick={onBackToHome}>
            <ArrowLeft size={24} />
          </button>
          <div className="subject-badge">{subject} - Essays</div>
          <button
            className="speak-button"
            onClick={() => speakText(showAnswer ? question.answer : question.question)}
          >
            <Volume2 size={24} />
          </button>
        </div>

        <div className="progress-section">
          <div className="progress-text">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="essay-content">
          <div className="teacher-section">
            <Image
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face"
              alt="Teacher Character"
              width={100}
              height={100}
              className="teacher-character"
              priority
            />
            <div className="speech-bubble">
              <h2 className="question-text">{question.question}</h2>
            </div>
          </div>

          {!showAnswer ? (
            <div className="answer-section">
              <button className="reveal-button" onClick={handleShowAnswer}>
                <span>Show Answer</span>
                <Volume2 size={20} />
              </button>
            </div>
          ) : (
            <div className="answer-display">
              <div className="answer-content">
                <h3 className="answer-title">📚 Answer:</h3>
                <p className="answer-text">{question.answer}</p>
              </div>

              <div className="next-button-container">
                <button className="next-button" onClick={onNext}>
                  <span>Next Question</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssayCard;
