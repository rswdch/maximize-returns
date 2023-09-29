import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className='btn'>Home</Link>
      <Link to="/login" className="btn">
        Login
      </Link>
      <Link to="/signup" className="btn">
        Sign Up
      </Link>
      <Link to="/about" className="btn">
        About
      </Link>
    </nav>
  );
};

export default Navbar;
