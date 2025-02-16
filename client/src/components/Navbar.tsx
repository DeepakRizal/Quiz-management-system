import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button.js";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  function handleClick() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to={"/dashboard"} className="text-xl font-bold">
        Quizo
      </Link>
      <div className="flex gap-4">
        {user && (
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        )}
        {user && (
          <Link to="/create" className="hover:text-gray-300">
            Create Quiz
          </Link>
        )}
        {user && (
          <Button onClick={handleClick} className="hover:text-gray-300">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
