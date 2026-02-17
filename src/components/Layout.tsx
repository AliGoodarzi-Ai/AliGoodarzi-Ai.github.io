import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NeuralBackground from "./NeuralBackground";
import VisitorWidget from "./VisitorWidget";

const Layout = () => (
  <div className="min-h-screen relative">
    <NeuralBackground />
    <Navbar />
    <main className="relative z-10 pt-20 pb-16">
      <Outlet />
    </main>
    {/* Footer with visitor widget */}
    <footer className="relative z-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <VisitorWidget />
        <div className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Ali Goodarzi
        </div>
      </div>
    </footer>
  </div>
);

export default Layout;