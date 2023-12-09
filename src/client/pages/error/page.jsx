import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="section">
      <h2>Error 404: Page not Found.</h2>
      <Link to="/">Return Home</Link>
    </section>
  );
};

export default Error;
