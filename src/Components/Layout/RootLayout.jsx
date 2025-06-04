import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import { use } from "react";
import ThemeContext from "../../context/themeContext";

const RootLayout = () => {
  const { theme } = use(ThemeContext);
  return (
    <div data-theme={theme} className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
