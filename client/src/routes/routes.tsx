import CreateQuiz from "@/pages/CreateQuiz.js";
import Dashboard from "@/pages/Dashboard.js";
import Login from "@/pages/Login.js";
import Layout from "@/Layout.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/create"
          element={
            <Layout>
              <CreateQuiz />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
