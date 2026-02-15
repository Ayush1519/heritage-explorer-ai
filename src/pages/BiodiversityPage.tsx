import { useState } from "react";
import { motion } from "framer-motion";
import { biodiversityRecords, indianStates } from "@/data/mockData";
import { Leaf, Search, Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  Endangered: "bg-destructive text-destructive-foreground",
  Vulnerable: "bg-terracotta text-terracotta-foreground",
  "Least Concern": "bg-forest text-forest-foreground",
};

export default function BiodiversityPage() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "animal" | "plant">("all");

  const filtered = biodiversityRecords.filter((r) => {
    if (search && !r.species.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedState && r.state !== selectedState) return false;
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    return true;
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-nature transition-all hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={r.image} alt={r.species} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[r.conservationStatus] || "bg-muted text-muted-foreground"}`}>
                    {r.conservationStatus}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-forest" />
                  <h3 className="font-display font-semibold text-sm">{r.species}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{r.region}</p>
                <p className="text-xs text-muted-foreground line-clamp-3">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No species found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
