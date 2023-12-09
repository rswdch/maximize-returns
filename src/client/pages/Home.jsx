import React from "react";
import { Button } from "daisyui"

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to Maximize My Returns!</h1>
      <p>
        Organize your purchases and never lose your receipts for returns and
        warranties.
      </p>
      <p>
        Blazingly Fast! Built with TypeScript, Express, React, and PostgreSQL
      </p>
      <div className="bg-blue-500 text-white p-4">
        This is a component styled with Tailwind CSS!
      </div>
      <button className="btn">
        Click me!
      </button>
    </div>
  );
};

export default Home;
