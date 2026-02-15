import { useState, useCallback } from "react";
import { UserProgress } from "@/data/types";
import { defaultUserProgress } from "@/data/mockData";

const STORAGE_KEY = "heritage-user-progress";

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultUserProgress;
    } catch {
      return defaultUserProgress;
    }
  });

  const save = useCallback((updated: UserProgress) => {
    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      const updated = { ...prev, xp: newXp, level: newLevel };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeSite = useCallback((siteId: string) => {
    setProgress((prev) => {
      if (prev.completedSites.includes(siteId)) return prev;
      const updated = { ...prev, completedSites: [...prev.completedSites, siteId] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeStory = useCallback((storyId: string) => {
    setProgress((prev) => {
      if (prev.completedStories.includes(storyId)) return prev;
      const updated = { ...prev, completedStories: [...prev.completedStories, storyId] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addBadge = useCallback((badgeId: string) => {
    setProgress((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      const updated = { ...prev, badges: [...prev.badges, badgeId] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { progress, addXp, completeSite, completeStory, addBadge, save };
}
