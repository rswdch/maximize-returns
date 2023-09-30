import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
      const result = await fetch("/session/signup", {
        method: "POST",
        body: formJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultJson = await result.json();
      console.log(resultJson);
      localStorage.setItem("token", resultJson.token);
      console.log(formData);
      setUser(formData.get("username"));
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      console.error("Authentication Error! Please log in again!");
    }
  }
  return (
    <section className="section">
      <h2>Sign up for a new account</h2>
      <form method="post" onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="text" name="email" className="form-input" id="email" />
        </div>
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            type="text"
            name="username"
            className="form-input"
            id="username"
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            name="password"
            className="form-input"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-block">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Signup;
