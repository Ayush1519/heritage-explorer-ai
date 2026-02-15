import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Clock, CheckCircle, XCircle, Send } from "lucide-react";
import { CommunityContribution } from "@/data/types";

const sampleContributions: CommunityContribution[] = [
  { id: "1", type: "story", title: "The Legend of Charminar", content: "A folk tale about the founding of Hyderabad and the prayer that led to the construction of Charminar.", region: "Telangana", category: "culture", contributorName: "Priya S.", status: "approved", createdAt: new Date("2025-12-10") },
  { id: "2", type: "tradition", title: "Bihu Dance of Assam", content: "Bihu is a set of three festivals celebrated in Assam. The Rongali Bihu marks the Assamese New Year with joyful dance.", region: "Assam", category: "culture", contributorName: "Rahul B.", status: "approved", createdAt: new Date("2025-11-20") },
  { id: "3", type: "observation", title: "Spotted Deer in Ranthambore", content: "Observed a herd of over 30 spotted deer near the lake area in Ranthambore National Park.", region: "Rajasthan", category: "biodiversity", contributorName: "Ananya K.", status: "approved", createdAt: new Date("2026-01-05") },
];

export default function CommunityPage() {
  const [contributions, setContributions] = useState(sampleContributions);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", region: "", category: "culture", type: "story" as const, contributorName: "" });

  const handleSubmit = () => {
    if (!form.title || !form.content || !form.contributorName) return;
    const newContribution: CommunityContribution = {
      ...form,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date(),
    };
    setContributions((prev) => [newContribution, ...prev]);
    setShowForm(false);
    setForm({ title: "", content: "", region: "", category: "culture", type: "story", contributorName: "" });
  };

  const statusIcons = { pending: <Clock className="w-4 h-4 text-accent" />, approved: <CheckCircle className="w-4 h-4 text-forest" />, rejected: <XCircle className="w-4 h-4 text-destructive" /> };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Community</h1>
            <p className="text-muted-foreground">Share local stories, traditions, and observations</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2.5 bg-gradient-heritage text-primary-foreground rounded-xl font-medium flex items-center gap-2 shadow-heritage hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Contribute
          </button>
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card rounded-2xl border border-border p-6 mb-8">
            <h3 className="font-display font-semibold text-lg mb-4">Share Your Contribution</h3>
            <div className="space-y-3">
              <input value={form.contributorName} onChange={(e) => setForm({ ...form, contributorName: e.target.value })} placeholder="Your name" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <div className="flex gap-3">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm flex-1">
                  <option value="story">Story</option>
                  <option value="tradition">Tradition</option>
                  <option value="observation">Observation</option>
                  <option value="photo">Photo</option>
                </select>
                <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} placeholder="Region" className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Your contribution..." rows={4} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <button onClick={handleSubmit} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2">
                <Send className="w-4 h-4" /> Submit for Review
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {contributions.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.contributorName} • {c.region} • {c.type}</p>
                </div>
                <div className="flex items-center gap-1 text-xs capitalize">
                  {statusIcons[c.status]}
                  <span className="text-muted-foreground">{c.status}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{c.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
