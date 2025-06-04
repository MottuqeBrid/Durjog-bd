// src/components/Navbar.jsx

import { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ThemeContext from "../../context/themeContext";
import { Link, NavLink } from "react-router";
import { FiLogOut } from "react-icons/fi";
// import { useEffect, useState } from "react";
import { MdOutlineWbSunny, MdDarkMode } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const handleToggleTheme = () => {
    toggleTheme();
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-blogs" className="hover:text-primary">
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink to="/featured" className="hover:text-primary">
          Featured Blogs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-blog" className="hover:text-primary">
              Add Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className="hover:text-primary">
              Wishlist
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar px-4 py-2 sticky top-0 z-50 bg-base-100 shadow-[6px_6px_12px_#c5c5c5,_-6px_-6px_12px_#ffffff] dark:shadow-[4px_4px_15px_#1f1f1f,_-4px_-4px_15px_#2f2f2f] rounded-b-xl">
      {/* Mobile Dropdown */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navLinks}
        </ul>
      </div>

      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          Durjog bd
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 text-base font-medium">
          {navLinks}
        </ul>
      </div>

      {/* Theme Toggle + User Area */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-full shadow-inner bg-base-200 hover:bg-base-300 transition duration-300"
        >
          {theme === "light" ? (
            <MdDarkMode className="w-5 h-5" />
          ) : (
            <MdOutlineWbSunny className="w-5 h-5" />
          )}
        </button>

        {/* Auth Area */}
        {user ? (
          <div className="flex items-center gap-3">
            <div
              className="tooltip tooltip-bottom"
              data-tip={user?.displayName || "User"}
            >
              <img
                src={
                  user?.photoURL || "https://i.ibb.co/MBtjqXQ/default-user.png"
                }
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
            </div>
            <button
              onClick={async () => {
                await logout();
                Swal.fire(
                  "Logged Out Successfully",
                  "We hope to see you back soon!",
                  "success"
                );
              }}
              className="btn btn-outline btn-error btn-sm"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
