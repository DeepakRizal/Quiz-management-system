import React, { useState } from "react";
import { Input } from "@/components/ui/input.js";
import Button from "@/components/Button.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { username, password } = loginData;
      const res = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      if (res.status === 200) {
        navigate("/dashboard");
      } else {
        alert("Invalid credntials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(
    identifier: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setLoginData((prevData) => ({
      ...prevData,
      [identifier]: event.target.value,
    }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input
          placeholder="Username"
          onChange={(e) => handleChange("username", e)}
        />
        <Input
          onChange={(e) => handleChange("password", e)}
          className="mt-4"
          type="password"
          placeholder="Password"
        />
        <Button onClick={handleLogin} className="mt-4 w-full">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
