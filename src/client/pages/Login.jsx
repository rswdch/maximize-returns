import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const result = await fetch('/session/login', {method: form.method, body: formData});
    console.log(result);
  }

  return (
    <section className="section">
      <h2>Login to your account</h2>
      <form method="post" onSubmit={handleSubmit} className="form">
        <div className='form-row'>
          <label htmlFor="username" className="form-label">username</label>
          <input type="text" className='form-input' id='username' />
        </div>
        <div className='form-row'>
          <label htmlFor="password" className="form-label">password</label>
          <input type="password" className='form-input' id='password' />
        </div>
        <button type='submit' className="btn btn-block">Login</button>
      </form>
    </section>
  );
};

export default Login;
