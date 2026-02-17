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
  </div>
);

export default Layout;