import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // const result = await fetch("/session/login", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // });
    try {
      const formData = new FormData(e.target);
      const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
      const result = await fetch("/session/login", {
        method: "POST",
        body: formJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultJson = await result.json();
      localStorage.setItem("token", resultJson.token);
      console.log("FormData username")
      console.log(formData.get('username'))
      setUser(formData.get("username"));
      navigate('/dashboard')
    } catch (error) {
      console.error("Authentication Error! Please log in again!");
    }
  }

  return (
    <section className="section">
      <h2>Login to your account</h2>
      <form method="post" onSubmit={handleSubmit} className="form">
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
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
