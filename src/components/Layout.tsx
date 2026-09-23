import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NeuralBackground from "./NeuralBackground";

const Layout = () => (
  <div className="min-h-screen relative">
    <NeuralBackground />
    <Navbar />
    <main className="relative z-10 pt-20 pb-16">
      <Outlet />
    </main>
    <footer className="relative z-10 pb-8 px-4">
      <div className="max-w-6xl mx-auto text-center text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} Ali Goodarzi
      </div>
    </footer>
  </div>
);

export default Layout;
