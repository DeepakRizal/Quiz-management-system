import React from "react";
import { Input } from "@/components/ui/input.js";
import Button from "@/components/Button.js";

const Login = () => {
  function handleLogin() {}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input placeholder="Username" />
        <Input className="mt-4" type="password" placeholder="Password" />
        <Button onClick={handleLogin} className="mt-4 w-full">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
