/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import { addQuizScore } from '../../lib/stores/progress';

interface SentenceData {
  id: string;
  turkish: string;
  en: string;
  ar?: string;
  cefr: string;
}

interface Props {
  sentences: SentenceData[];
}

export default function SentenceBuilder({ sentences }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const sentence = sentences[currentIndex];
  
  useEffect(() => {
    if (sentence) {
      initSentence();
    }
  }, [sentence]);

  const initSentence = () => {
    // Split Turkish sentence into words and remove punctuation for chips
    const words = sentence.turkish
      .replace(/[.,!?;:]/g, '')
      .split(' ')
      .filter(w => w.length > 0);
    
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    setBuiltWords([]);
    setIsCorrect(null);
  };

  const handleChipClick = (word: string, index: number) => {
    if (isCorrect) return;

    const newBuilt = [...builtWords, word];
    setBuiltWords(newBuilt);
    
    // Remove from shuffled
    const newShuffled = [...shuffledWords];
    newShuffled.splice(index, 1);
    setShuffledWords(newShuffled);

    // Check if finished
    const targetWords = sentence.turkish
      .replace(/[.,!?;:]/g, '')
      .split(' ')
      .filter(w => w.length > 0);

    if (newBuilt.length === targetWords.length) {
      if (newBuilt.join(' ').toLowerCase() === targetWords.join(' ').toLowerCase()) {
        setIsCorrect(true);
        setScore(prev => prev + 1);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleReset = () => {
    initSentence();
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      addQuizScore(score, sentences.length, 'Sentence Builder');
    }
  };

  if (!sentence) return <div className="text-center py-20">No sentences found.</div>;

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto p-8 glass-card text-center animate-fade-in">
        <div className="text-6xl mb-6">🎯</div>
        <h2 className="text-3xl font-bold mb-2">Sentence Builder Finished!</h2>
        <p className="text-text-secondary mb-8">You correctly built {score} out of {sentences.length} sentences.</p>
        <div className="flex gap-4">
          <button onClick={() => { setCurrentIndex(0); setScore(0); setIsFinished(false); }} className="btn btn-primary flex-1">Try Again</button>
          <a href="/practice/" className="btn btn-secondary flex-1">Back to Practice</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8 text-sm font-bold text-text-muted">
        <span>Sentence {currentIndex + 1} of {sentences.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="glass-card p-8 mb-8">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Translate to Turkish:</p>
        <h2 className="text-2xl font-bold text-primary mb-2">{sentence.en}</h2>
        {sentence.ar && <p className="text-lg text-text-secondary mb-8" dir="rtl">{sentence.ar}</p>}

        <div className="space-y-6">
          {/* Target Area */}
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Your Sentence:</p>
            <div className={`chip-container ${isCorrect === true ? 'border-success bg-success/5' : isCorrect === false ? 'border-error bg-error/5' : ''}`}>
              {builtWords.map((word, i) => (
                <span key={i} className={`chip ${isCorrect === true ? 'chip-success' : isCorrect === false ? 'chip-error' : 'chip-active'}`}>
                  {word}
                </span>
              ))}
              {builtWords.length === 0 && <span className="text-text-muted/40 text-sm self-center">Click chips below to build...</span>}
            </div>
          </div>

          {/* Chips Area */}
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Word Chips:</p>
            <div className="flex flex-wrap gap-2">
              {shuffledWords.map((word, i) => (
                <button 
                  key={i} 
                  onClick={() => handleChipClick(word, i)}
                  className="chip"
                  disabled={isCorrect !== null}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isCorrect !== null && (
          <div className="mt-8 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <span className="text-success font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  Correct!
                </span>
              ) : (
                <span className="text-error font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                  Incorrect.
                </span>
              )}
              {!isCorrect && (
                <p className="text-sm">The correct order was: <strong className="text-text">{sentence.turkish}</strong></p>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isCorrect && <button onClick={handleReset} className="btn btn-secondary px-4 py-2 text-sm">Retry</button>}
              <button onClick={handleNext} className="btn btn-primary px-6 py-2 text-sm">
                {currentIndex < sentences.length - 1 ? 'Next Sentence →' : 'Finish Session'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
