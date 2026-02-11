import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Search */}
      <div className="mt-2">
        <Search />
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
