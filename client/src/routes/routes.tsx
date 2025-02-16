import Login from "@/pages/Login.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
