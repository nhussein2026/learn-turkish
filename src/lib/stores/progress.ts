/**
 * Progress Store
 * Manages user learning progress using LocalStorage.
 */

export interface UserProgress {
  masteredWords: string[]; // IDs of words marked as mastered
  quizScores: {
    date: string;
    score: number;
    total: number;
    type: string;
  }[];
  lastActivity: string;
  streak: number;
}

const STORAGE_KEY = 'learn_turkish_progress';

const DEFAULT_PROGRESS: UserProgress = {
  masteredWords: [],
  quizScores: [],
  lastActivity: new Date().toISOString(),
  streak: 0,
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_PROGRESS;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  // Dispatch custom event for cross-component reactivity
  window.dispatchEvent(new CustomEvent('progress-update', { detail: progress }));
}

export function toggleMasteredWord(wordId: string) {
  const progress = getProgress();
  const index = progress.masteredWords.indexOf(wordId);
  
  if (index === -1) {
    progress.masteredWords.push(wordId);
  } else {
    progress.masteredWords.splice(index, 1);
  }
  
  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
  return index === -1; // returns true if now mastered
}

export function isWordMastered(wordId: string): boolean {
  const progress = getProgress();
  return progress.masteredWords.includes(wordId);
}

export function addQuizScore(score: number, total: number, type: string) {
  const progress = getProgress();
  progress.quizScores.push({
    date: new Date().toISOString(),
    score,
    total,
    type
  });
  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
}
