import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Brain, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/research", label: "Research", icon: "🔬" },
  { to: "/projects", label: "Projects", icon: "💻" },
  { to: "/publications", label: "Publications", icon: "📚" },
  { to: "/skills", label: "Skills", icon: "⚡" },
  { to: "/contact", label: "Contact", icon: "✉️" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Brain className="w-7 h-7 text-primary group-hover:text-secondary transition-colors duration-300" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-accent animate-blink" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gradient">
            Ali Goodarzi
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? "text-primary bg-primary/10 shadow-glow-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-xs opacity-70">{l.icon}</span>
                    {l.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          {/* Theme and Language controls */}
          <div className="ml-2 flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* AI Status indicator */}
        <div className="hidden md:flex lg:hidden items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-mono">AI ONLINE</span>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden glass-strong border-t border-border/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-primary bg-primary/10 shadow-glow-primary"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                      }`
                    }
                  >
                    <span className="text-lg">{l.icon}</span>
                    <span>{l.label}</span>
                  </NavLink>
                </motion.div>
              ))}
              
              {/* Mobile AI Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between pt-4 border-t border-border/30 mt-4"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-mono">ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;