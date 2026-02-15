import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, BookOpen, Leaf, Trophy, Users, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-heritage.jpg";
import biodiversityImage from "@/assets/biodiversity-hero.jpg";
import XpBar from "@/components/XpBar";

const features = [
  { icon: Map, title: "Heritage Explorer", desc: "Virtually explore India's magnificent monuments and ancient sites", path: "/heritage", color: "bg-gradient-heritage" },
  { icon: BookOpen, title: "Interactive Stories", desc: "Choose your path through history, culture, and ecology", path: "/stories", color: "bg-gradient-nature" },
  { icon: Leaf, title: "Biodiversity Map", desc: "Discover India's incredible wildlife and ecosystems", path: "/biodiversity", color: "bg-forest" },
  { icon: Trophy, title: "Quizzes & Games", desc: "Test your knowledge and earn XP with fun challenges", path: "/quizzes", color: "bg-terracotta" },
  { icon: Users, title: "Community", desc: "Share local stories, traditions and observations", path: "/community", color: "bg-teal" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Indian Heritage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-24 pb-32 md:pt-36 md:pb-44">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Reimagining Indian Heritage
              <span className="block text-accent">for the Digital Generation</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl font-light">
              Explore ancient monuments in 3D, chat with AI storytellers, discover biodiversity hotspots,
              and play learning games — all in one immersive platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/heritage"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-heritage text-primary-foreground rounded-xl font-semibold shadow-heritage hover:shadow-lg transition-all hover:scale-105"
              >
                Start Exploring
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground/10 backdrop-blur text-primary-foreground border border-primary-foreground/20 rounded-xl font-semibold hover:bg-primary-foreground/20 transition-all"
              >
                Read Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
        >
          Explore, Learn & <span className="text-gradient-saffron">Preserve</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.path} variants={item}>
              <Link
                to={f.path}
                className="group block bg-card rounded-2xl p-6 border border-border hover:shadow-heritage transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Discover India's Biodiversity
              </h3>
              <p className="text-muted-foreground mb-6">
                From the Royal Bengal Tiger to the sacred Lotus, explore the incredible diversity of life across
                India's varied ecosystems — forests, deserts, wetlands, and mountains.
              </p>
              <Link
                to="/biodiversity"
                className="inline-flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all"
              >
                Explore biodiversity <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
              <img src={biodiversityImage} alt="Indian Biodiversity" className="rounded-2xl shadow-lg w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "40+", label: "UNESCO Sites" },
            { value: "1,300+", label: "Bird Species" },
            { value: "90,000+", label: "Animal Species" },
            { value: "8,000+", label: "Years of History" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient-saffron">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-xl font-bold mb-2">🏛️ Virasat</p>
          <p className="text-sm opacity-70">Education & Cultural Preservation Platform</p>
          <p className="text-xs opacity-50 mt-4">Built with ❤️ for India's heritage</p>
        </div>
      </footer>
    </div>
  );
}
