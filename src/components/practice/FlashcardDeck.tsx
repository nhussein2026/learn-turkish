/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import { isWordMastered, toggleMasteredWord } from '../../lib/stores/progress';

interface WordData {
  id: string;
  turkish: string;
  en: string;
  ar?: string;
  cefr: string;
}

interface Props {
  words: WordData[];
}

export default function FlashcardDeck({ words }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [mastered, setMastered] = useState(false);

  const word = words[currentIndex];

  useEffect(() => {
    if (word) {
      setMastered(isWordMastered(word.id));
    }
    setIsFlipped(false);
  }, [currentIndex, word]);

  const nextCard = () => {
    setDirection(1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setDirection(0);
    }, 200);
  };

  const prevCard = () => {
    setDirection(-1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
      setDirection(0);
    }, 200);
  };

  const handleToggleMastered = (e: any) => {
    e.stopPropagation();
    const nowMastered = toggleMasteredWord(word.id);
    setMastered(nowMastered);
  };

  const playAudio = (e: any) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.turkish);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (!word) return <div className="text-center py-20">No words found for this level.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-6 text-sm font-bold text-text-muted">
        <span>Card {currentIndex + 1} of {words.length}</span>
        <div className="flex-1 h-1.5 bg-surface-alt rounded-full mx-4 overflow-hidden border border-border-light">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div 
        className={`relative h-96 w-full cursor-pointer perspective-1000 transition-all duration-300 transform ${
          direction === 1 ? '-translate-x-full opacity-0' : 
          direction === -1 ? 'translate-x-full opacity-0' : 
          'translate-x-0 opacity-100'
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front (Turkish) */}
          <div className="absolute w-full h-full backface-hidden glass-card flex flex-col items-center justify-center p-8 border-primary/20 shadow-xl">
            <span className={`badge cefr-${word.cefr} absolute top-6 right-6`}>{word.cefr}</span>
            <button 
              onClick={playAudio}
              className="absolute top-6 left-6 p-2 rounded-full bg-surface-alt hover:bg-surface-hover text-primary transition-colors"
              title="Listen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
            <h2 className="text-5xl font-extrabold text-text mb-4 font-heading">{word.turkish}</h2>
            <p className="text-sm text-text-muted mt-8 uppercase tracking-[0.2em] font-bold">Tap to see translation</p>
          </div>

          {/* Back (Translation) */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-card flex flex-col items-center justify-center p-8 border-secondary/20 shadow-xl">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">English</p>
                <h3 className="text-3xl font-bold text-text">{word.en}</h3>
              </div>
              {word.ar && (
                <div className="text-center pt-4 border-t border-border-light">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Arabic</p>
                  <h3 className="text-3xl font-bold text-text" dir="rtl">{word.ar}</h3>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleToggleMastered}
              className={`mt-10 btn ${mastered ? 'bg-success text-white' : 'btn-secondary'} px-6`}
            >
              {mastered ? '✓ Mastered' : 'Mark as Mastered'}
            </button>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-12 gap-4">
        <button 
          onClick={prevCard}
          className="btn btn-secondary flex-1 py-4 text-base"
        >
          ← Previous
        </button>
        <button 
          onClick={nextCard}
          className="btn btn-primary flex-1 py-4 text-base"
        >
          Next Card →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
