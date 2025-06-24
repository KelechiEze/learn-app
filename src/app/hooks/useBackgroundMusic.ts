import { useEffect, useRef } from 'react';

export const useBackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and configure audio
    audioRef.current = new Audio();
    audioRef.current.src = 'https://cdn.pixabay.com/download/audio/2022/11/03/audio_457f33df61.mp3?filename=kids-happy-117994.mp3';
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;
    audioRef.current.preload = 'auto';

    // Handle AudioContext (including Safari support)
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    const audioContext = new AudioCtx();

    const startMusic = () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((e) => console.warn('Autoplay prevented:', e));
      }
    };

    const handleFirstInteraction = () => {
      startMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return { toggleMusic };
};
