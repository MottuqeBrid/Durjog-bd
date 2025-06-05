import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import { use } from "react";
import ThemeContext from "../../context/themeContext";
import Footer from "../Footer/Footer";

const RootLayout = () => {
  const { theme } = use(ThemeContext);
  return (
    <div data-theme={theme} className="w-full min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
