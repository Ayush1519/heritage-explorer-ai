import { useState } from "react";
import { motion } from "framer-motion";
import { quizQuestions } from "@/data/mockData";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Check, X, Trophy, Zap, RotateCcw } from "lucide-react";
import XpBar from "@/components/XpBar";

export default function QuizzesPage() {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const { addXp } = useUserProgress();

  const q = quizQuestions[qIdx];

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (qIdx + 1 < quizQuestions.length) {
        setQIdx((i) => i + 1);
        setSelected(null);
      } else {
        setDone(true);
        addXp(score * 10 + 10);
      }
    }, 1000);
  };

  const reset = () => {
    setStarted(false);
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setDone(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Quizzes & Challenges</h1>
          <p className="text-muted-foreground mb-6">Test your knowledge of Indian heritage, wildlife and culture</p>
          <XpBar />
        </motion.div>

        {!started && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">Heritage Quiz</h2>
            <p className="text-muted-foreground mb-6">{quizQuestions.length} questions • Earn XP for correct answers</p>
            <button onClick={() => setStarted(true)} className="px-8 py-3 bg-gradient-heritage text-primary-foreground rounded-xl font-semibold shadow-heritage hover:scale-105 transition-transform">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Start Quiz</span>
            </button>
          </motion.div>
        )}

        {started && !done && q && (
          <motion.div key={qIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Question {qIdx + 1} of {quizQuestions.length}</span>
              <span className="text-sm font-medium flex items-center gap-1"><Zap className="w-4 h-4 text-accent" /> +{q.xp} XP</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full mb-6">
              <div className="h-full bg-gradient-heritage rounded-full transition-all" style={{ width: `${((qIdx + 1) / quizQuestions.length) * 100}%` }} />
            </div>

            <h2 className="text-xl font-display font-bold mb-6">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.answer;
                const isSelected = selected === idx;
                let cls = "border-border hover:border-primary/50";
                if (selected !== null) {
                  if (isCorrect) cls = "border-forest bg-forest/10";
                  else if (isSelected) cls = "border-destructive bg-destructive/10";
                }
                return (
                  <button
                    key={idx}
                    disabled={selected !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left px-5 py-4 border rounded-xl transition-all ${cls}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-medium">{opt}</span>
                      {selected !== null && isCorrect && <Check className="w-5 h-5 text-forest" />}
                      {selected !== null && isSelected && !isCorrect && <X className="w-5 h-5 text-destructive" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {done && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <p className="text-5xl mb-4">🏆</p>
            <h2 className="text-2xl font-display font-bold mb-2">Quiz Complete!</h2>
            <p className="text-lg text-muted-foreground">{score}/{quizQuestions.length} correct</p>
            <p className="text-primary font-semibold mt-2">+{score * 10 + 10} XP earned!</p>
            <button onClick={reset} className="mt-6 px-6 py-2.5 bg-card border border-border rounded-xl font-medium inline-flex items-center gap-2 hover:shadow-sm transition">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
