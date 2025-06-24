'use client';

import {
  ArrowRight,
  BookOpen,
  Calculator,
  Brain,
  Globe,
  BookText,
  Church,
  Wrench,
  Star,
  Sparkles,
  Rocket,
  PartyPopper,
  Feather
} from 'lucide-react';
import Image from 'next/image';
import './HomeScreen.css';

interface HomeScreenProps {
  onStartLearning: (subject: string) => void;
}

// 🎨 Map colors to CSS class names
const getColorClass = (color: string) => {
  switch (color) {
    case '#4F86F7': return 'bg-english';
    case '#00C49A': return 'bg-maths';
    case '#FF6B6B': return 'bg-verbal';
    case '#FFC107': return 'bg-french';
    case '#845EC2': return 'bg-literature';
    case '#FF5E78': return 'bg-crs';
    case '#1DD1A1': return 'bg-vocational';
    default: return '';
  }
};

const HomeScreen = ({ onStartLearning }: HomeScreenProps) => {
  const subjects = [
    { name: 'English', icon: BookOpen, color: '#4F86F7' },
    { name: 'Mathematics', icon: Calculator, color: '#00C49A' },
    { name: 'Verbal Reasoning', icon: Brain, color: '#FF6B6B' },
    { name: 'French', icon: Globe, color: '#FFC107' },
    { name: 'History', icon: BookText, color: '#845EC2' },
    { name: 'CRS', icon: Church, color: '#FF5E78' },
    { name: 'Vocational', icon: Wrench, color: '#1DD1A1' }
  ];

  return (
    <div className="home-screen">
      <div className="background-animation">
        <div className="floating-element element-1"><Star size={20} /></div>
        <div className="floating-element element-2"><Star size={20} fill="#FFD700" /></div>
        <div className="floating-element element-3"><Sparkles size={20} /></div>
        <div className="floating-element element-4"><PartyPopper size={20} /></div>
        <div className="floating-element element-5"><Feather size={20} /></div>
      </div>

      <div className="container">
        <div className="header-section">
          <div className="character-image">
            <Image
              src="/coolkid.jpg"
              alt="Learning Character"
              width={120}
              height={120}
              className="character-img"
              priority
            />
          </div>
          <h1 className="main-title">
            Welcome Tehila to <span className="gradient-text">Fun Learning!</span>
          </h1>
          <p className="subtitle">
            Choose a subject and let&apos;s start your amazing learning adventure!{' '}
            <Rocket size={16} style={{ verticalAlign: 'middle' }} />
          </p>
        </div>

        <div className="subjects-grid">
          {subjects.map((subject, index) => {
            const IconComponent = subject.icon;
            const bgClass = getColorClass(subject.color);
            return (
              <div
                key={subject.name}
                className={`subject-card ${bgClass}`}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
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

        <div className="footer-message">
          <p>
            <Sparkles size={16} style={{ verticalAlign: 'middle' }} /> Ready to become a super learner? Pick your favorite subject!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
