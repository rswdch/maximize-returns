import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const btnClass = "btn btn-ghost text-xl";
  return (
    <nav className="navbar bg-primary text-primary-content">
      <div className={"navbar-start"}>
        <div className="dropdown">
          <div tabIndex={0} role={"button"} className={"btn btn-ghost lg:hidden"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/login" className={btnClass}>
              Login
            </Link></li>
            <li><Link to="/signup" className={btnClass}>
              Sign Up
            </Link></li>
            <li><Link to="/about" className={btnClass}>
              About
            </Link></li>
          </ul>
        </div>
        <Link to="/" className={btnClass}>Home</Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/login" className={btnClass}>
            Login
          </Link></li>
          <li><Link to="/signup" className={btnClass}>
            Sign Up
          </Link></li>
          <li><Link to="/about" className={btnClass}>
            About
          </Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
