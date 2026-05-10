/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import { addQuizScore } from '../../lib/stores/progress';

interface WordData {
  id: string;
  turkish: string;
  en: string;
  ar?: string;
  cefr: string;
}

interface Question {
  wordId: string;
  turkish: string;
  correctAnswer: string;
  options: string[];
}

interface Props {
  words: WordData[];
}

export default function QuizEngine({ words }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    generateQuiz();
  }, [words]);

  const generateQuiz = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10); // 10 questions per quiz

    const newQuestions = selected.map(word => {
      const distractors = words
        .filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.en);

      const options = [word.en, ...distractors].sort(() => Math.random() - 0.5);

      return {
        wordId: word.id,
        turkish: word.turkish,
        correctAnswer: word.en,
        options
      };
    });

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowResult(false);
  };

  const handleOptionClick = (option: string) => {
    if (showResult) return;
    
    setSelectedOption(option);
    setShowResult(true);

    if (option === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      addQuizScore(score + (selectedOption === questions[currentIndex].correctAnswer ? 1 : 0), questions.length, 'Vocabulary Quiz');
    }
  };

  if (questions.length === 0) return <div>Generating quiz...</div>;

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto p-8 glass-card text-center animate-fade-in">
        <div className="text-6xl mb-6">🏆</div>
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-text-secondary mb-8">You scored {score} out of {questions.length}</p>
        
        <div className="text-5xl font-extrabold text-primary mb-12">{percentage}%</div>
        
        <div className="flex gap-4">
          <button onClick={generateQuiz} className="btn btn-primary flex-1">Try Again</button>
          <a href="/practice/" className="btn btn-secondary flex-1">Back to Practice</a>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fade-in">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8 text-sm font-bold text-text-muted">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="glass-card p-8 md:p-12 text-center mb-8">
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">What does this mean?</p>
        <h2 className="text-5xl font-extrabold text-text mb-8">{currentQuestion.turkish}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map(option => {
            let style = "btn btn-secondary py-5 text-lg font-bold transition-all border-2";
            if (showResult) {
              if (option === currentQuestion.correctAnswer) {
                style = "btn bg-success/20 border-success text-success py-5 text-lg font-bold";
              } else if (option === selectedOption) {
                style = "btn bg-error/20 border-error text-error py-5 text-lg font-bold";
              } else {
                style = "btn btn-secondary py-5 text-lg font-bold opacity-50";
              }
            } else if (option === selectedOption) {
              style = "btn btn-primary py-5 text-lg font-bold border-primary";
            }

            return (
              <button 
                key={option}
                onClick={() => handleOptionClick(option)}
                className={style}
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <div className="flex justify-center animate-fade-in">
          <button onClick={handleNext} className="btn btn-primary px-12 py-4 text-lg">
            {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
