import { motion } from "framer-motion";
import { useUserProgress } from "@/hooks/useUserProgress";
import { badges } from "@/data/mockData";
import { Star, Zap, Award } from "lucide-react";

export default function XpBar() {
  const { progress } = useUserProgress();
  const xpForNextLevel = progress.level * 100;
  const currentLevelXp = progress.xp - (progress.level - 1) * 100;
  const percentage = Math.min((currentLevelXp / 100) * 100, 100);

  const earnedBadges = badges.filter((b) => progress.badges.includes(b.id));

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-heritage flex items-center justify-center">
            <Star className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">Level {progress.level}</p>
            <p className="text-xs text-muted-foreground">{progress.xp} XP total</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-accent-foreground">
          <Zap className="w-4 h-4 text-accent" />
          <span className="font-medium">{currentLevelXp}/100 XP</span>
        </div>
      </div>

      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-heritage rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {earnedBadges.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1">
            {earnedBadges.map((b) => (
              <span key={b.id} className="text-lg" title={b.name}>
                {b.icon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
