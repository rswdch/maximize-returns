import React from "react";
import { LoginForm } from "./login/LoginForm.jsx";

const Home = () => {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Maximize My Returns!</h1>
          <p className="mb-5">
            Organize your purchases and never lose your receipts for returns and
            warranties.
          </p>
          <p className="mb-5">
            Blazingly Fast! Built with TypeScript, Express, React, and PostgreSQL
          </p>
          <button className="btn btn-primary">Demo</button>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
