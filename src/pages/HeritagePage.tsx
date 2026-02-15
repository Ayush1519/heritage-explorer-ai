import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heritageSites } from "@/data/mockData";
import { MapPin, Clock, TreePine, Music, X, Play, ChevronRight } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function HeritagePage() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const { progress, completeSite, addXp } = useUserProgress();
  const site = heritageSites.find((s) => s.id === selectedSite);

  const handleExplore = (siteId: string) => {
    setSelectedSite(siteId);
    if (!progress.completedSites.includes(siteId)) {
      completeSite(siteId);
      addXp(25);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Heritage Explorer</h1>
          <p className="text-muted-foreground mb-8">Virtually explore India's most magnificent heritage sites</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heritageSites.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleExplore(s.id)}
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-heritage transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {s.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {progress.completedSites.includes(s.id) && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-forest rounded-full flex items-center justify-center text-forest-foreground text-sm">✓</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-display font-bold text-primary-foreground">{s.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                      <MapPin className="w-3 h-3" />
                      {s.state}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium">
                    Explore <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {site && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto"
            onClick={() => setSelectedSite(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img src={site.imageUrl} alt={site.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <button onClick={() => setSelectedSite(null)} className="absolute top-4 right-4 w-10 h-10 bg-background/20 backdrop-blur rounded-full flex items-center justify-center text-primary-foreground hover:bg-background/40 transition">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{site.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80 mt-1">
                    <MapPin className="w-4 h-4" /> {site.state}, {site.region}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-foreground leading-relaxed">{site.description}</p>

                {/* Video */}
                <div className="rounded-xl overflow-hidden border border-border aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">3D Virtual Tour Coming Soon</p>
                    <p className="text-xs text-muted-foreground">Immersive experience of {site.name}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-sm">Historical Background</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{site.historicalBackground}</p>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Music className="w-4 h-4 text-terracotta" />
                      <h4 className="font-semibold text-sm">Cultural Importance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{site.culturalImportance}</p>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TreePine className="w-4 h-4 text-forest" />
                      <h4 className="font-semibold text-sm">Ecological Importance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{site.ecologicalImportance}</p>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Music className="w-4 h-4 text-gold" />
                      <h4 className="font-semibold text-sm">Local Traditions</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{site.localTraditions}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
