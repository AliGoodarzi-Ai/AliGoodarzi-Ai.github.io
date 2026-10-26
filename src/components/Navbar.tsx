import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

const externals = [
  { href: "https://scholar.google.com/citations?user=G9GnajEAAAAJ&hl=en", label: "Scholar" },
  { href: "https://www.researchgate.net/profile/Ali-Goodarzi-7", label: "ResearchGate" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-base font-semibold transition-colors ${
    isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/95 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold text-foreground">
          Ali Goodarzi
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          {externals.map((e) => (
            <a
              key={e.label}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              {e.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="md:hidden px-3 py-2 rounded-md text-sm font-semibold text-foreground/80 hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-border flex flex-wrap items-center gap-1">
              {externals.map((e) => (
                <a
                  key={e.label}
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm text-foreground/70 hover:text-primary"
                >
                  {e.label}
                </a>
              ))}
              <span className="ml-auto">
                <ThemeToggle />
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
