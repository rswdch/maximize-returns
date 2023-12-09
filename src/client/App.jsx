import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/about/page.jsx";
import Signup from "./pages/signup/page.jsx";
import Login from "./pages/login/page.jsx";
import Error from "./pages/error/page.jsx";
import Dashboard from "./pages/dashboard/page.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup setUser={setUser} />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
