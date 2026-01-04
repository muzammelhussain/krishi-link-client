import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

import logo from "../../assets/logo-farmer.jpg";
import ThemeToggle from "../theme/ThemeToggle";

const Header = () => {
  const { user } = use(AuthContext);

 

  const links = (
    <>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allCrops">All Crops</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/support">Help & Support</NavLink>
      </li>
      <li>
        <NavLink to="/privacy-policy">Privacy Policy</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-40">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* 🔹 Mobile Menu */}
        <div className="navbar-start">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 shadow z-50"
            >
              {links}
            </ul>
          </div>

          {/* 🔹 Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <img
              className="h-9 w-9 rounded-full object-cover border-2 border-primary" // Added border using primary color
              src={logo}
              alt="Krishi Link Logo"
            />
            <p className="hidden sm:block">Krishi Link</p>
          </Link>
        </div>

        {/* 🔹 Laptop & Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">{links}</ul>
        </div>

        {/* 🔹 Right Actions */}
        <div className="navbar-end flex items-center gap-2">
         {!user && (
  <>
    <NavLink
      to="/register"
      className="btn btn-sm btn-secondary hidden md:inline-flex"
    >
      Register
    </NavLink>

    <NavLink
      to="/login"
      className="btn btn-sm btn-outline bg-primary"
    >
      Login
    </NavLink>
  </>
)}


          {/* 🔹 Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
