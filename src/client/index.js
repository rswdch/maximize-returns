import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

console.log("Hello from webpack client");
// console.log("Refresh change:");

const root = createRoot(document.getElementById("contents"));
root.render(<App></App>);
