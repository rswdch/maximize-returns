import React from "react";
import { NavLink } from "react-router-dom";

const AuthedNavbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="link">
        Home
      </NavLink>
      <NavLink to="/login" className="link">
        Logout
      </NavLink>
      <NavLink to="/about" className="link">
        About
      </NavLink>
    </nav>
  );
};

export default AuthedNavbar;
