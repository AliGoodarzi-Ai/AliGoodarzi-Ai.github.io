import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fi";

interface Translations {
  [key: string]: {
    en: string;
    fi: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", fi: "Etusivu" },
  "nav.research": { en: "Research", fi: "Tutkimus" },
  "nav.projects": { en: "Projects", fi: "Projektit" },
  "nav.publications": { en: "Publications", fi: "Julkaisut" },
  "nav.skills": { en: "Skills", fi: "Taidot" },
  "nav.contact": { en: "Contact", fi: "Yhteystiedot" },
  
  // Home page
  "home.greeting": { 
    en: "PhD Student in Computer Science", 
    fi: "Tietojenkäsittelytieteen tohtoriopiskelija" 
  },
  "home.collaboration": { 
    en: "AVAILABLE FOR RESEARCH COLLABORATION", 
    fi: "AVOINNA TUTKIMUSYHTEISTYÖLLE"
  },
  "home.viewResearch": { en: "View Research", fi: "Näytä tutkimus" },
  "home.exploreProjects": { en: "Explore Projects", fi: "Tutustu projekteihin" },
  "home.tagline": { en: "Researching AI Agents, Critical Thinking & Human-AI Interaction", fi: "Tutkii tekoälyagentteja, kriittistä ajattelua ja ihmisen ja tekoälyn vuorovaikutusta" },
  "home.publications": { en: "Publications", fi: "Julkaisut" },
  "home.projects": { en: "Projects", fi: "Projektit" },
  "home.yearsExp": { en: "Years Exp.", fi: "Vuotta kokemusta" },
  
  // Research page
  "research.title": { en: "Research", fi: "Tutkimus" },
  "research.projects": { en: "Projects", fi: "Projektit" },
  "research.overview": { en: "RESEARCH OVERVIEW", fi: "TUTKIMUKSEN YLEISKATSAUS" },
  "research.portfolio": { en: "Research Portfolio", fi: "Tutkimusportfolio" },
  "research.description": { en: "My research bridges AI theory and practical applications, focusing on systems that enhance human capabilities through intelligent collaboration.", fi: "Tutkimukseni yhdistää tekoälyn teorian ja käytännön sovellukset, keskittyen järjestelmiin jotka parantavat ihmisen kykyjä älykkään yhteistyön kautta." },
  "research.focusAreas": { en: "Research Focus Areas", fi: "Tutkimuksen painopistealueet" },
  "research.timeline": { en: "Research Timeline", fi: "Tutkimuksen aikajana" },
  "research.viewPublications": { en: "View Publications", fi: "Näytä julkaisut" },
  
  // Skills page
  "skills.title": { en: "Technical", fi: "Tekninen" },
  "skills.expertise": { en: "Expertise", fi: "Osaaminen" },
  "skills.certifications": { en: "Certifications", fi: "Sertifikaatit" },
  "skills.aiMl": { en: "AI & ML", fi: "Tekoäly & koneoppiminen" },
  "skills.development": { en: "Development", fi: "Kehitys" },
  "skills.hardware": { en: "Hardware & IoT", fi: "Laitteisto & IoT" },
  "skills.tools": { en: "Tools & Platforms", fi: "Työkalut & alustat" },
  
  // Contact page
  "contact.connect": { en: "Connect", fi: "Ota yhteyttä" },
  "contact.withMe": { en: "With Me", fi: "Minuun" },
  "contact.researchDomains": { en: "Research Domains", fi: "Tutkimusalueet" },
  "contact.openFor": { en: "Open for research collaboration and opportunities", fi: "Avoinna tutkimusyhteistyölle ja mahdollisuuksille" },
  "contact.email": { en: "Email Me", fi: "Lähetä sähköpostia" },
  "contact.schedule": { en: "Schedule Meeting", fi: "Varaa tapaaminen" },
  
  // Projects page
  "projects.title": { en: "Projects", fi: "Projektit" },
  "projects.showcase": { en: "Project Showcase", fi: "Projektinäyttely" },
  "projects.viewDemo": { en: "View Demo", fi: "Katso demo" },
  "projects.viewCode": { en: "View Code", fi: "Näytä koodi" },
  
  // Publications page
  "publications.title": { en: "Publications", fi: "Julkaisut" },
  "publications.academic": { en: "Academic Publications", fi: "Akateemiset julkaisut" },
  
  // Common
  "common.publications": { en: "Publications", fi: "Julkaisut" },
  "common.projects": { en: "Projects", fi: "Projektit" },
  "common.experience": { en: "Experience", fi: "Kokemus" },
  "common.copyright": { en: "© 2025 Ali Goodarzi", fi: "© 2025 Ali Goodarzi" },
  "common.visits": { en: "visits", fi: "vierailua" },
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
