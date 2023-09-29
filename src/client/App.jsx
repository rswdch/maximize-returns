import React from "react";
import MainContainer from "./containers/MainContainer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Error from "./pages/Error.jsx";
import SharedLayout from "./pages/SharedLayout.jsx";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element ={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login setUser={setUser}/>} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="dashboard" element={<Home />} >
        </Route>
      </Routes>
      <footer>my footer</footer>
    </BrowserRouter>
  );
};

export default App;
