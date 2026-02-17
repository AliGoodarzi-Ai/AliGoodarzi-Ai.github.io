import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fi" | "fa";

interface Translations {
  [key: string]: {
    en: string;
    fi: string;
    fa: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", fi: "Etusivu", fa: "خانه" },
  "nav.research": { en: "Research", fi: "Tutkimus", fa: "تحقیقات" },
  "nav.projects": { en: "Projects", fi: "Projektit", fa: "پروژه‌ها" },
  "nav.publications": { en: "Publications", fi: "Julkaisut", fa: "انتشارات" },
  "nav.skills": { en: "Skills", fi: "Taidot", fa: "مهارت‌ها" },
  "nav.contact": { en: "Contact", fi: "Yhteystiedot", fa: "تماس" },
  
  // Home page
  "home.greeting": { 
    en: "PhD Student in Computer Science", 
    fi: "Tietojenkäsittelytieteen tohtoriopiskelija", 
    fa: "دانشجوی دکترای علوم کامپیوتر" 
  },
  "home.collaboration": { 
    en: "AVAILABLE FOR RESEARCH COLLABORATION", 
    fi: "AVOINNA TUTKIMUSYHTEISTYÖLLE", 
    fa: "آماده همکاری پژوهشی" 
  },
  "home.viewResearch": { en: "View Research", fi: "Näytä tutkimus", fa: "مشاهده تحقیقات" },
  "home.exploreProjects": { en: "Explore Projects", fi: "Tutustu projekteihin", fa: "کاوش پروژه‌ها" },
  
  // Research page
  "research.title": { en: "Research", fi: "Tutkimus", fa: "تحقیقات" },
  "research.projects": { en: "Projects", fi: "Projektit", fa: "پروژه‌ها" },
  
  // Skills page
  "skills.title": { en: "Technical", fi: "Tekninen", fa: "فنی" },
  "skills.expertise": { en: "Expertise", fi: "Osaaminen", fa: "تخصص" },
  "skills.certifications": { en: "Certifications", fi: "Sertifikaatit", fa: "گواهینامه‌ها" },
  
  // Contact page
  "contact.connect": { en: "Connect", fi: "Yhdistä", fa: "ارتباط" },
  "contact.withMe": { en: "With Me", fi: "Minuun", fa: "با من" },
  "contact.researchDomains": { en: "Research Domains", fi: "Tutkimusalueet", fa: "حوزه‌های پژوهشی" },
  
  // Common
  "common.publications": { en: "Publications", fi: "Julkaisut", fa: "انتشارات" },
  "common.projects": { en: "Projects", fi: "Projektit", fa: "پروژه‌ها" },
  "common.experience": { en: "Experience", fi: "Kokemus", fa: "تجربه" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    // Set RTL for Persian
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
