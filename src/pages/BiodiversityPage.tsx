import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { biodiversityRecords, indianStates } from "@/data/mockData";
import { Leaf, Search, X, ChevronRight, MapPin } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

const statusColors: Record<string, string> = {
  Endangered: "bg-destructive text-destructive-foreground",
  Vulnerable: "bg-terracotta text-terracotta-foreground",
  "Least Concern": "bg-forest text-forest-foreground",
};

const categoryIcons: Record<string, string> = {
  animal: "🦁",
  plant: "🌿",
};

export default function BiodiversityPage() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "animal" | "plant">("all");
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const { progress, completeSite, addXp } = useUserProgress();

  const filtered = biodiversityRecords.filter((r) => {
    if (search && !r.species.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedState && r.state !== selectedState) return false;
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    return true;
  });

  const species = biodiversityRecords.find((s) => s.id === selectedSpecies);

  const handleExplore = (speciesId: string) => {
    setSelectedSpecies(speciesId);
    if (!progress.completedSites.includes(speciesId)) {
      completeSite(speciesId);
      addXp(15);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Biodiversity Explorer</h1>
          <p className="text-muted-foreground mb-8">Discover India's incredible wildlife, plants, and ecosystems</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search species..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All States</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
            {(["all", "animal", "plant"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                  categoryFilter === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : cat + "s"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleExplore(r.id)}
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-nature transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={r.image} alt={r.species} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs rounded-full font-medium">
                      {categoryIcons[r.category]} {r.category}
                    </span>
                  </div>
                  {progress.completedSites.includes(r.id) && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-forest rounded-full flex items-center justify-center text-forest-foreground text-sm">✓</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-display font-bold text-primary-foreground">{r.species}</h3>
                    <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                      <MapPin className="w-3 h-3" />
                      {r.state}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className={`inline-block px-2 py-1 text-xs rounded-full font-medium mb-2 ${statusColors[r.conservationStatus] || "bg-muted text-muted-foreground"}`}>
                    {r.conservationStatus}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium">
                    Discover <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg">No species found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {species && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto"
            onClick={() => setSelectedSpecies(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img src={species.image} alt={species.species} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <button onClick={() => setSelectedSpecies(null)} className="absolute top-4 right-4 w-10 h-10 bg-background/20 backdrop-blur rounded-full flex items-center justify-center text-primary-foreground hover:bg-background/40 transition">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-3xl mb-2">{categoryIcons[species.category]}</div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{species.species}</h2>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80 mt-1">
                    <MapPin className="w-4 h-4" /> {species.region}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusColors[species.conservationStatus] || "bg-muted text-muted-foreground"}`}>
                    {species.conservationStatus}
                  </span>
                  <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium capitalize">
                    {species.category}
                  </span>
                  <span className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full font-medium">
                    {species.state}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">About</h3>
                  <p className="text-foreground leading-relaxed">{species.description}</p>
                </div>

                {/* Conservation Status Details */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-muted/50 rounded-xl p-4 border border-border"
                >
                  <h3 className="text-lg font-semibold mb-3 text-primary">Conservation Status</h3>
                  <div className="space-y-2 text-sm text-foreground">
                    {species.conservationStatus === "Endangered" && (
                      <>
                        <p>⚠️ This species is facing a very high risk of extinction in the wild.</p>
                        <p>Conservation efforts and habitat protection are critical for survival.</p>
                      </>
                    )}
                    {species.conservationStatus === "Vulnerable" && (
                      <>
                        <p>⚠️ This species is facing a high risk of extinction in the near future.</p>
                        <p>Continued conservation efforts are necessary to prevent population decline.</p>
                      </>
                    )}
                    {species.conservationStatus === "Least Concern" && (
                      <>
                        <p>✓ This species is not currently at risk of extinction.</p>
                        <p>However, maintaining habitat and monitoring populations remains important.</p>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Interesting Facts */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold mb-3 text-primary">Did you know?</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {species.species.includes("Tiger") && (
                      <>
                        <li>🐅 Tigers are the largest living cats on Earth.</li>
                        <li>🐅 Each tiger has unique stripe patterns, like human fingerprints.</li>
                        <li>🐅 A single tiger can roam a territory of 100+ square kilometers.</li>
                      </>
                    )}
                    {species.species.includes("Peacock") && (
                      <>
                        <li>🦚 The tail has over 200 feathers and can fan out into a magnificent display.</li>
                        <li>🦚 Indian peafowl can jump up to 4.5 meters high.</li>
                        <li>🦚 They are highly intelligent and can recognize individuals.</li>
                      </>
                    )}
                    {species.species.includes("Lion") && (
                      <>
                        <li>🦁 Asiatic lions are smaller than African lions.</li>
                        <li>🦁 The Gir Forest population has increased from 20 to over 600 individuals.</li>
                        <li>🦁 Unlike African lions, they do not form large groups.</li>
                      </>
                    )}
                    {species.species.includes("Rhinoceros") && (
                      <>
                        <li>🦏 One-horned rhinos can weigh up to 2,300 kg.</li>
                        <li>🦏 They have excellent hearing and smell but poor eyesight.</li>
                        <li>🦏 Kaziranga National Park protects over 2,600 rhinos.</li>
                      </>
                    )}
                    {species.species.includes("Banyan") && (
                      <>
                        <li>🌳 The Great Banyan tree in Kolkata covers 3.5 acres.</li>
                        <li>🌳 Banyan trees are considered sacred in many Indian cultures.</li>
                        <li>🌳 They can live for over 1,000 years.</li>
                      </>
                    )}
                    {species.species.includes("Lotus") && (
                      <>
                        <li>🌸 The lotus closes and submerges at night, reappearing clean in the morning.</li>
                        <li>🌸 It is the national flower of India and holds spiritual significance.</li>
                        <li>🌸 Lotus seeds can remain viable for thousands of years.</li>
                      </>
                    )}
                    {species.species.includes("Snow Leopard") && (
                      <>
                        <li>❄️ Snow leopards have furry foot pads that protect against cold and rocky terrain.</li>
                        <li>❄️ They can jump 5 times the length of their body.</li>
                        <li>❄️ Only about 4,000-6,500 snow leopards remain in the wild.</li>
                      </>
                    )}
                    {species.species.includes("Nilgiri Tahr") && (
                      <>
                        <li>🐐 Nilgiri tahrs are endemic to the Western Ghats.</li>
                        <li>🐐 They are also known as the Nilgiri wild goat.</li>
                        <li>🐐 Less than 3,000 individuals remain in their natural habitat.</li>
                      </>
                    )}
                    {!species.species.match(/Tiger|Peacock|Lion|Rhinoceros|Banyan|Lotus|Snow Leopard|Nilgiri Tahr/) && (
                      <li>🌿 This species is an important part of India's rich biodiversity heritage.</li>
                    )}
                  </ul>
                </motion.div>

                {/* How to Help */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-primary/5 rounded-xl p-4 border border-primary/20"
                >
                  <h3 className="text-lg font-semibold mb-3 text-primary">How You Can Help</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>✓ Support wildlife conservation organizations and national parks.</li>
                    <li>✓ Reduce your carbon footprint to combat climate change.</li>
                    <li>✓ Never buy products made from endangered species.</li>
                    <li>✓ Spread awareness about {species.species} and their habitat needs.</li>
                    <li>✓ Participate in environmental cleanup drives.</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
