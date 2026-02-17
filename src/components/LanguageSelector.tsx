import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const languages = [
  { code: "en" as const, label: "EN", flag: "🇬🇧", name: "English" },
  { code: "fi" as const, label: "FI", flag: "🇫🇮", name: "Suomi" },
  { code: "fa" as const, label: "FA", flag: "🇮🇷", name: "فارسی" },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass px-3 py-2 rounded-lg hover:shadow-glow-secondary transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4 text-secondary" />
        <span className="text-xs font-mono">{currentLang.flag} {currentLang.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 glass rounded-lg overflow-hidden z-50 min-w-[140px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${
                    language === lang.code
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-muted/50 text-foreground/80"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
