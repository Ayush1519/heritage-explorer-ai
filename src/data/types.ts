export interface HeritageSite {
  id: string;
  name: string;
  state: string;
  region: string;
  description: string;
  culturalImportance: string;
  historicalBackground: string;
  ecologicalImportance: string;
  localTraditions: string;
  videoUrl: string;
  imageUrl: string;
  tags: string[];
}

export interface StoryChapter {
  id: string;
  text: string;
  choices: { text: string; nextChapter: string }[];
}

export interface Story {
  id: string;
  title: string;
  region: string;
  category: string;
  language: string;
  description: string;
  imageUrl: string;
  chapters: StoryChapter[];
  quiz: { question: string; options: string[]; answer: number }[];
}

export interface BiodiversityRecord {
  id: string;
  species: string;
  category: "animal" | "plant" | "ecosystem";
  region: string;
  description: string;
  image: string;
  conservationStatus: string;
  state: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  category: string;
  xp: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  completedStories: string[];
  completedSites: string[];
  quizScores: { quizId: string; score: number; total: number }[];
  badges: string[];
  dailyChallengeCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface CommunityContribution {
  id: string;
  type: "story" | "tradition" | "photo" | "observation";
  title: string;
  content: string;
  region: string;
  category: string;
  contributorName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}
