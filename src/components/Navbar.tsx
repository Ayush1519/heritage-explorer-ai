import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, BookOpen, Landmark, Leaf, Trophy, Users, Menu, X, LocateIcon } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Landmark },
  { path: "/heritage", label: "Heritage", icon: Map },
  { path: "/visit", label: "Visit", icon: LocateIcon },
  { path: "/stories", label: "Stories", icon: BookOpen },
  { path: "/biodiversity", label: "Biodiversity", icon: Leaf },
  { path: "/quizzes", label: "Quizzes", icon: Trophy },
  { path: "/community", label: "Community", icon: Users },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <span className="font-display text-xl font-bold text-gradient-saffron">Virasat</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border px-4 pb-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
