import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

const externals = [
  {
    href: "https://scholar.google.com/citations?user=G9GnajEAAAAJ&hl=en",
    label: "Google Scholar",
    icon: GraduationCap,
  },
  {
    href: "https://www.researchgate.net/profile/Ali-Goodarzi-7",
    label: "ResearchGate",
    icon: BookOpen,
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Name */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Ali Goodarzi
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-semibold transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground/75 hover:text-foreground hover:bg-muted/50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <span className="mx-2 h-5 w-px bg-border" />

          {externals.map((e) => (
            <a
              key={e.label}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              title={e.label}
              aria-label={e.label}
              className="p-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-muted/50 transition-colors"
            >
              <e.icon className="w-4 h-4" />
            </a>
          ))}

          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-strong border-t border-border/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}

              <div className="pt-3 mt-2 border-t border-border/30 flex items-center gap-2">
                {externals.map((e) => (
                  <a
                    key={e.label}
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-primary hover:bg-muted/50 transition-colors"
                  >
                    <e.icon className="w-4 h-4" />
                    {e.label}
                  </a>
                ))}
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
