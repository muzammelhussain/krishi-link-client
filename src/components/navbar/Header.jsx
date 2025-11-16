import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const { user, userLogout } = use(AuthContext);
  console.log(user);
  const handleLogout = () => {
    userLogout();
    toast.success("Logout successful!");
  };

  const links = (
    <>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allCrops">All Crops</NavLink>
      </li>
      <li>
        <NavLink to="/addCrops">Add Crops</NavLink>
      </li>
      <li>
        <NavLink to="/myInterest">My Interest</NavLink>
      </li>
      <li>
        <NavLink to="/myPost">My post</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <span>
            <img src="../../assets/logo-farmer.jpg" alt="" />
            <a className="btn btn-ghost text-xl">Krishi Link</a>
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-sm btn-primary px-4 md:px-8 mr-2">
            <NavLink to="/register">Register</NavLink>
          </button>
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-primary px-4 md:px-8"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary px-8">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
