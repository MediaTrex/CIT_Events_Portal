import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}
      <Search />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
