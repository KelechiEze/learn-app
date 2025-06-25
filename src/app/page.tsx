'use client';
import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import QuestionTypeScreen from './components/QuestionTypeScreen/QuestionTypeScreen';
import QuestionCard from './components/QuestionCard/QuestionCard';
import EssayCard from './components/EssayCard/EssayCard';
import QuizCard from './components/QuizCard/QuizCard';
import ScoresScreen from './components/ScoresScreen/ScoresScreen';
import ProgressScreen from './components/ProgressScreen/ProgressScreen';
import { questionsData, essayQuestionsData } from './data/questions';
import { quizQuestions } from './data/quizdata';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState<'objective' | 'essay'>('objective');
  const [shuffledQuizQuestions, setShuffledQuizQuestions] = useState(quizQuestions);

  const handleGetStarted = () => {
    setCurrentScreen('home');
  };

  const handleStartLearning = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentScreen('questionType');
  };

  const handleStartQuiz = () => {
    // Shuffle quiz questions for variety
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setShuffledQuizQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen('quiz');
  };

  const handleViewScores = () => {
    setCurrentScreen('scores');
  };

  const handleSelectType = (type: 'objective' | 'essay') => {
    setSelectedType(type);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen(type === 'objective' ? 'question' : 'essay');
  };

  const handleAnswerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const currentSubjectQuestions = questionsData[selectedSubject as keyof typeof questionsData];
    if (currentQuestionIndex < currentSubjectQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('progress');
    }
  };

  const handleAnswerQuiz = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < shuffledQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Save quiz score to localStorage
      const quizScore = {
        id: Date.now().toString(),
        score: isCorrect ? score + 1 : score,
        totalQuestions: shuffledQuizQuestions.length,
        date: new Date().toLocaleDateString(),
        percentage: Math.round(((isCorrect ? score + 1 : score) / shuffledQuizQuestions.length) * 100)
      };
      
      const existingScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      existingScores.push(quizScore);
      localStorage.setItem('quizScores', JSON.stringify(existingScores));
      
      setCurrentScreen('quizProgress');
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

  const handleRetakeQuiz = () => {
    handleStartQuiz();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
      case 'home':
        return (
          <HomeScreen 
            onStartLearning={handleStartLearning}
            onStartQuiz={handleStartQuiz}
            onViewScores={handleViewScores}
          />
        );
      case 'scores':
        return <ScoresScreen onBackToHome={handleBackToHome} />;
      case 'questionType':
        return (
          <QuestionTypeScreen
            selectedSubject={selectedSubject}
            onSelectType={handleSelectType}
            onBackToHome={handleBackToHome}
          />
        );
      case 'question':
        const currentSubjectQuestions = questionsData[selectedSubject as keyof typeof questionsData];
        return (
          <QuestionCard
            question={currentSubjectQuestions[currentQuestionIndex]}
            onAnswer={handleAnswerQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentSubjectQuestions.length}
            subject={selectedSubject}
            onBackToHome={handleBackToHome}
          />
        );
      case 'essay':
        const currentEssayQuestions = essayQuestionsData[selectedSubject as keyof typeof essayQuestionsData];
        return (
          <EssayCard
            question={currentEssayQuestions[currentQuestionIndex]}
            onNext={handleNextEssay}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentEssayQuestions.length}
            subject={selectedSubject}
            onBackToHome={handleBackToHome}
          />
        );
      case 'quiz':
        return (
          <QuizCard
            question={shuffledQuizQuestions[currentQuestionIndex]}
            onAnswer={handleAnswerQuiz}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={shuffledQuizQuestions.length}
            onBackToHome={handleBackToHome}
          />
        );
      case 'progress':
        const totalQuestions = selectedType === 'objective' 
          ? questionsData[selectedSubject as keyof typeof questionsData].length
          : essayQuestionsData[selectedSubject as keyof typeof essayQuestionsData].length;
        return (
          <ProgressScreen
            score={selectedType === 'objective' ? score : totalQuestions}
            totalQuestions={totalQuestions}
            subject={selectedSubject}
            onBackToHome={handleBackToHome}
            onRetakeTest={handleRetakeTest}
            questionType={selectedType}
          />
        );
      case 'quizProgress':
        return (
          <ProgressScreen
            score={score}
            totalQuestions={shuffledQuizQuestions.length}
            subject="Mixed Quiz"
            onBackToHome={handleBackToHome}
            onRetakeTest={handleRetakeQuiz}
            questionType="objective"
          />
        );
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default Index;