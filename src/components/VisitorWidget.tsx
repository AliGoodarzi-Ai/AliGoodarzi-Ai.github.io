import { useState, useEffect } from "react";
import { Users, MapPin, Clock, Cloud, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationInfo {
  city?: string;
  country?: string;
  timezone?: string;
  temp?: number;
  weather?: string;
}

const VisitorWidget = () => {
  const { t } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [localTime, setLocalTime] = useState<string>("");
  const [location, setLocation] = useState<LocationInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update local time every second
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simple localStorage-based visitor counter
        const visits = parseInt(localStorage.getItem("siteVisits") || "0") + 1;
        const lastVisit = localStorage.getItem("lastVisit");
        const today = new Date().toDateString();
        
        if (lastVisit !== today) {
          localStorage.setItem("siteVisits", visits.toString());
          localStorage.setItem("lastVisit", today);
        }
        
        // Base visits + localStorage visits for a more realistic number
        setVisitorCount(1247 + parseInt(localStorage.getItem("siteVisits") || "1"));

        // Get location info using ipapi.co (free tier)
        try {
          const locRes = await fetch("https://ipapi.co/json/");
          if (locRes.ok) {
            const locData = await locRes.json();
            
            setLocation({
              city: locData.city || "Unknown",
              country: locData.country_name || "Unknown",
              timezone: locData.timezone,
            });

            // Get weather using wttr.in (free, no API key needed)
            if (locData.city) {
              try {
                const weatherRes = await fetch(
                  `https://wttr.in/${encodeURIComponent(locData.city)}?format=%t+%C`
                );
                if (weatherRes.ok) {
                  const weatherText = await weatherRes.text();
                  const match = weatherText.match(/([+-]?\d+)°C\s*(.*)/);
                  if (match) {
                    setLocation(prev => ({
                      ...prev,
                      temp: parseInt(match[1]),
                      weather: match[2].trim(),
                    }));
                  }
                }
              } catch (e) {
                console.log("Weather fetch error:", e);
              }
            }
          }
        } catch (e) {
          console.log("Location fetch error:", e);
        }
      } catch (error) {
        console.log("Widget data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="glass px-3 py-2 flex items-center gap-2 text-xs font-mono animate-pulse">
        <div className="w-16 h-4 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
      {/* Visitor Count */}
      <div className="glass px-3 py-1.5 flex items-center gap-1.5 group hover:shadow-glow-primary transition-all">
        <Users className="w-3 h-3 text-primary" />
        <span className="text-muted-foreground">
          <span className="text-primary font-bold">{visitorCount.toLocaleString()}</span> {t("common.visits")}
        </span>
      </div>

      {/* Location */}
      {location.city && (
        <div className="glass px-3 py-1.5 flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-secondary" />
          <span className="text-muted-foreground">
            {location.city}, {location.country}
          </span>
        </div>
      )}

      {/* Local Time */}
      <div className="glass px-3 py-1.5 flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-accent" />
        <span className="text-muted-foreground">{localTime}</span>
      </div>

      {/* Weather */}
      {location.temp !== undefined && (
        <div className="glass px-3 py-1.5 flex items-center gap-1.5">
          <Cloud className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">
            {location.temp}°C {location.weather}
          </span>
        </div>
      )}
    </div>
  );
};

export default VisitorWidget;
