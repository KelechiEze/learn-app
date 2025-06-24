'use client';

import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import QuestionTypeScreen from './components/QuestionTypeScreen/QuestionTypeScreen';
import QuestionCard from './components/QuestionCard/QuestionCard';
import EssayCard from './components/EssayCard/EssayCard';
import ProgressScreen from './components/ProgressScreen/ProgressScreen';
import { questionsData, essayQuestionsData } from './data/questions';
import { useBackgroundMusic } from './hooks/useBackgroundMusic'; // ✅ hook import

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState<'objective' | 'essay'>('objective');

  useBackgroundMusic(); // ✅ enable background music

  const handleGetStarted = () => setCurrentScreen('home');

  const handleStartLearning = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentScreen('questionType');
  };

  const handleSelectType = (type: 'objective' | 'essay') => {
    setSelectedType(type);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen(type === 'objective' ? 'question' : 'essay');
  };

  const handleAnswerQuestion = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    const currentSubjectQuestions = questionsData[selectedSubject as keyof typeof questionsData];
    if (currentQuestionIndex < currentSubjectQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('progress');
    }
  };

  const handleNextEssay = () => {
    const currentSubjectQuestions = essayQuestionsData[selectedSubject as keyof typeof essayQuestionsData];
    if (currentQuestionIndex < currentSubjectQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('progress');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedSubject('');
    setSelectedType('objective');
  };

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen(selectedType === 'objective' ? 'question' : 'essay');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
      case 'home':
        return <HomeScreen onStartLearning={handleStartLearning} />;
      case 'questionType':
        return (
          <QuestionTypeScreen
            selectedSubject={selectedSubject}
            onSelectType={handleSelectType}
            onBackToHome={handleBackToHome}
          />
        );
      case 'question': {
        const questions = questionsData[selectedSubject as keyof typeof questionsData];
        return (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswerQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            subject={selectedSubject}
            onBackToHome={handleBackToHome}
          />
        );
      }
      case 'essay': {
        const questions = essayQuestionsData[selectedSubject as keyof typeof essayQuestionsData];
        return (
          <EssayCard
            question={questions[currentQuestionIndex]}
            onNext={handleNextEssay}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            subject={selectedSubject}
            onBackToHome={handleBackToHome}
          />
        );
      }
      case 'progress': {
        const total =
          selectedType === 'objective'
            ? questionsData[selectedSubject as keyof typeof questionsData].length
            : essayQuestionsData[selectedSubject as keyof typeof essayQuestionsData].length;

        return (
          <ProgressScreen
            score={selectedType === 'objective' ? score : total}
            totalQuestions={total}
            subject={selectedSubject}
            onBackToHome={handleBackToHome}
            onRetakeTest={handleRetakeTest}
            questionType={selectedType}
          />
        );
      }
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Index;
