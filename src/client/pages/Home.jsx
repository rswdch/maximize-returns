import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Maximize My Returns!</h1>
      <p>
        Organize your purchases and never lose your receipts for returns and
        warranties.
      </p>
      <p>
        Blazingly Fast! Built with TypeScript, Express, React, and PostgreSQL
      </p>
    </div>
  );
};

export default Home;
