import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "@/data/mockData";
import { Story } from "@/data/types";
import { BookOpen, ArrowRight, Check, X, RotateCcw } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

function StoryReader({ story, onClose }: { story: Story; onClose: () => void }) {
  const [currentChapter, setCurrentChapter] = useState("ch1");
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const { addXp, completeStory } = useUserProgress();

  const chapter = story.chapters.find((c) => c.id === currentChapter);
  const isEnd = chapter && chapter.choices.length === 0;

  const handleQuizAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === story.quiz[quizIdx].answer) setQuizScore((s) => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 < story.quiz.length) {
        setQuizIdx((i) => i + 1);
        setSelectedAnswer(null);
      } else {
        setQuizDone(true);
        addXp(quizScore * 10 + 20);
        completeStory(story.id);
      }
    }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="relative h-48">
          <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover rounded-t-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-background/20 backdrop-blur rounded-full flex items-center justify-center text-primary-foreground">
            <X className="w-5 h-5" />
          </button>
          <h2 className="absolute bottom-4 left-4 text-xl font-display font-bold text-primary-foreground">{story.title}</h2>
        </div>

        <div className="p-6">
          {!quizMode && chapter && (
            <>
              <motion.p key={currentChapter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-foreground leading-relaxed mb-6">
                {chapter.text}
              </motion.p>
              {chapter.choices.length > 0 ? (
                <div className="space-y-3">
                  {chapter.choices.map((choice) => (
                    <button
                      key={choice.nextChapter}
                      onClick={() => setCurrentChapter(choice.nextChapter)}
                      className="w-full text-left px-4 py-3 bg-card border border-border rounded-xl hover:border-primary hover:shadow-heritage transition-all flex items-center gap-3 group"
                    >
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                      <span className="text-sm font-medium">{choice.text}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-forest font-semibold">🎉 Story Complete! +20 XP</p>
                  <button onClick={() => setQuizMode(true)} className="px-6 py-3 bg-gradient-heritage text-primary-foreground rounded-xl font-semibold shadow-heritage">
                    Take the Quiz
                  </button>
                </div>
              )}
            </>
          )}

          {quizMode && !quizDone && story.quiz[quizIdx] && (
            <motion.div key={quizIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-xs text-muted-foreground mb-2">Question {quizIdx + 1} of {story.quiz.length}</p>
              <h3 className="text-lg font-semibold mb-4">{story.quiz[quizIdx].question}</h3>
              <div className="space-y-2">
                {story.quiz[quizIdx].options.map((opt, idx) => {
                  const isCorrect = idx === story.quiz[quizIdx].answer;
                  const isSelected = selectedAnswer === idx;
                  let cls = "border-border";
                  if (selectedAnswer !== null) {
                    if (isCorrect) cls = "border-forest bg-forest/10";
                    else if (isSelected) cls = "border-destructive bg-destructive/10";
                  }
                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full text-left px-4 py-3 border rounded-xl text-sm transition-all ${cls}`}
                    >
                      <span className="flex items-center justify-between">
                        {opt}
                        {selectedAnswer !== null && isCorrect && <Check className="w-4 h-4 text-forest" />}
                        {selectedAnswer !== null && isSelected && !isCorrect && <X className="w-4 h-4 text-destructive" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {quizDone && (
            <div className="text-center py-8">
              <p className="text-4xl mb-4">🏆</p>
              <h3 className="text-xl font-display font-bold mb-2">Quiz Complete!</h3>
              <p className="text-muted-foreground">You scored {quizScore}/{story.quiz.length}</p>
              <p className="text-primary font-semibold mt-2">+{quizScore * 10 + 20} XP earned!</p>
              <button onClick={onClose} className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium">
                Back to Stories
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StoriesPage() {
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const { progress } = useUserProgress();
  const story = stories.find((s) => s.id === activeStory);

  const categoryColors: Record<string, string> = {
    history: "bg-terracotta",
    culture: "bg-primary",
    biodiversity: "bg-forest",
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Interactive Stories</h1>
          <p className="text-muted-foreground mb-8">Choose your path through India's fascinating history, culture and ecology</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveStory(s.id)}
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-heritage transition-all hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 ${categoryColors[s.category] || "bg-primary"} text-primary-foreground text-xs rounded-full font-medium capitalize`}>
                      {s.category}
                    </span>
                  </div>
                  {progress.completedStories.includes(s.id) && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-forest rounded-full flex items-center justify-center text-forest-foreground text-sm">✓</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{s.region}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium">
                    <BookOpen className="w-4 h-4" /> Read Story
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {story && <StoryReader story={story} onClose={() => setActiveStory(null)} />}
      </AnimatePresence>
    </div>
  );
}
