import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Quizo</h1>
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/create" className="hover:text-gray-300">
          Create Quiz
        </Link>
        <Link to="/" className="hover:text-gray-300">
          Logout
        </Link>
      </div>
    </nav>
  );
}
