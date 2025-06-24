'use client';

import {
  ArrowRight,
  Star,
  BookOpen,
  Sparkles,
  Heart,
  Smile,
  Target,
  Trophy,
  Palette,
  Rocket
} from 'lucide-react';
import Image from 'next/image';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-background">
        <div className="floating-icon icon-1"><Star size={40} /></div>
        <div className="floating-icon icon-2"><BookOpen size={35} /></div>
        <div className="floating-icon icon-3"><Sparkles size={30} /></div>
        <div className="floating-icon icon-4"><Heart size={35} /></div>
        <div className="floating-icon icon-5"><Smile size={40} /></div>
        <div className="floating-icon icon-6"><Star size={25} /></div>
      </div>
      
      <div className="welcome-container">
        <div className="welcome-header">
          <div className="main-character">
            <Image 
              src="/ball.png"
              alt="Learning Friend"
              width={120}
              height={120}
              className="character-avatar"
              priority
            />
          </div>
          
          <h1 className="welcome-title">
            Welcome to <span className="fun-text">Fun Learning App!</span>
          </h1>
          
          <p className="welcome-message">
            🌟 Let&apos;s get started with your learning today! 🌟
          </p>
          
          <div className="fun-icons">
            <div className="bouncing-icon bounce-1"><BookOpen size={24} /></div>
            <div className="bouncing-icon bounce-2"><Target size={24} /></div>
            <div className="bouncing-icon bounce-3"><Trophy size={24} /></div>
            <div className="bouncing-icon bounce-4"><Palette size={24} /></div>
            <div className="bouncing-icon bounce-5"><Rocket size={24} /></div>
          </div>
        </div>

        <div className="start-section">
          <button className="start-button" onClick={onGetStarted}>
            <span>Start Learning</span>
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
