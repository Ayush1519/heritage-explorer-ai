import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Clock, CheckCircle, XCircle, Send, AlertCircle } from "lucide-react";
import { CommunityContribution } from "@/data/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const sampleContributions: CommunityContribution[] = [
  { id: "1", type: "story", title: "The Legend of Charminar", content: "A folk tale about the founding of Hyderabad and the prayer that led to the construction of Charminar.", region: "Telangana", category: "culture", contributorName: "Priya S.", status: "approved", createdAt: new Date("2025-12-10") },
  { id: "2", type: "tradition", title: "Bihu Dance of Assam", content: "Bihu is a set of three festivals celebrated in Assam. The Rongali Bihu marks the Assamese New Year with joyful dance.", region: "Assam", category: "culture", contributorName: "Rahul B.", status: "approved", createdAt: new Date("2025-11-20") },
  { id: "3", type: "observation", title: "Spotted Deer in Ranthambore", content: "Observed a herd of over 30 spotted deer near the lake area in Ranthambore National Park.", region: "Rajasthan", category: "biodiversity", contributorName: "Ananya K.", status: "approved", createdAt: new Date("2026-01-05") },
];

const STORAGE_KEY = "virasat_community_contributions";

export default function CommunityPage() {
  const [contributions, setContributions] = useState<CommunityContribution[]>(sampleContributions);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", content: "", region: "", category: "culture", type: "story" as const, contributorName: "" });

  // Load contributions from backend and localStorage on mount
  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      // Fetch from backend
      const response = await fetch(`${BACKEND_URL}/api/contributions`);
      if (response.ok) {
        const data = await response.json();
        const backendContributions = data.contributions.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }));
        setContributions([...backendContributions, ...sampleContributions]);
      }
    } catch (err) {
      console.error("Error fetching contributions:", err);
      // Fall back to localStorage if backend fails
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const withDates = parsed.map((c: any) => ({
            ...c,
            createdAt: new Date(c.createdAt)
          }));
          setContributions([...withDates, ...sampleContributions]);
        }
      } catch (error) {
        console.error("Error loading contributions from localStorage:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.contributorName) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Try to submit to backend first
      const response = await fetch(`${BACKEND_URL}/api/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSaved(true);
        setShowForm(false);
        setForm({ title: "", content: "", region: "", category: "culture", type: "story", contributorName: "" });
        setTimeout(() => setSaved(false), 3000);
        await fetchContributions();
      } else {
        throw new Error("Failed to submit to backend");
      }
    } catch (err) {
      console.error("Backend submission failed, saving to localStorage:", err);
      // Fallback to localStorage
      const newContribution: CommunityContribution = {
        ...form,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date(),
      };

      const updatedContributions = [newContribution, ...contributions];
      setContributions(updatedContributions);

      const userContributions = updatedContributions.filter(c => !sampleContributions.find(s => s.id === c.id));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userContributions));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      setSaved(true);
      setShowForm(false);
      setForm({ title: "", content: "", region: "", category: "culture", type: "story", contributorName: "" });
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const statusIcons = { pending: <Clock className="w-4 h-4 text-accent" />, approved: <CheckCircle className="w-4 h-4 text-forest" />, rejected: <XCircle className="w-4 h-4 text-destructive" /> };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-forest/10 border border-forest/30 rounded-xl flex items-center gap-2 text-forest"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Contribution submitted successfully!</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl flex items-center gap-2 text-destructive"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{error}</span>
          </motion.div>
        )}

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
            <h3 className="font-display font-semibold text-lg mb-2">Share Your Contribution</h3>
            <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Your contribution will be submitted for moderation and published after approval.
            </p>
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
              <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Submit for Review"}
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
