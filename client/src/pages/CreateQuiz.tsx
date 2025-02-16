import Button from "@/components/Button.js";
import { Input } from "@/components/ui/input.js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  function handleChange(
    identifier: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setQuiz((prevQuiz) => ({ ...prevQuiz, [identifier]: e.target.value }));
  }
  async function handleClick() {
    if (!quiz.title || !quiz.description) {
      alert("Please fill in all fields");
      return;
    }

    const title = quiz.title;
    const description = quiz.description;

    try {
      if (user) {
        const teacher_id = user.id;
        const response = await axios.post(`${apiUrl}/quizzes`, {
          title,
          description,
          teacher_id,
        });

        if (response.status === 201) {
          alert("Quiz created successfully!");
          navigate("/dashboard");
        }
      } else {
        return alert("You must be logged in to create a quiz ");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create quiz.");
    }
  }
  console.log(quiz);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Quiz</h1>
      <Input
        onChange={(e) => handleChange("title", e)}
        placeholder="Quiz title"
        className="mb-4"
        value={quiz.title}
      />
      <Input
        onChange={(e) => handleChange("description", e)}
        placeholder="Quiz Description"
        value={quiz.description}
      />
      <Button onClick={handleClick} className="mt-4 cursor-pointer">
        Save Quiz
      </Button>
    </div>
  );
};

export default CreateQuiz;
