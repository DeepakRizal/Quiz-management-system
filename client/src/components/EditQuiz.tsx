import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./../components/ui/input.js";
import { Button } from "./../components/ui/button.js";
import React from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`${apiUrl}/quizzes/${id}`);

      const { data: quiz } = res.data;
      setTitle(quiz.title);
      setDescription(quiz.description);
    };

    fetchQuiz();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/quizzes/${id}`, {
        title,
        description,
      });
      alert("Quiz updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Failed to update quiz.");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
        <Input
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleUpdate} className="mt-4">
          Update Quiz
        </Button>
      </div>
    </div>
  );
}
