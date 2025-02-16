import Button from "./../components/Button.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Quiz {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const getAllQuizzes = async () => {
      const {
        data: { data },
      }: { data: { data: Quiz[] } } = await axios.get(`${apiUrl}/quizzes`);

      setQuizzes(data);
    };
    getAllQuizzes();
  }, []);

  async function handleDelete(id: number) {
    try {
      const res = await axios.delete(`${apiUrl}/quizzes/${id}`);
      if (res.status === 200) {
        alert("quiz deleted successfully");
      }
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.log(error);
      alert("cannot delete quiz item in the moment try after sometime! ");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
      <Link to={"/create"}>
        <Button className="mb-4 cursor-pointer">Create New Quiz</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {quizzes?.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 border justify-items-center  rounded-lg shadow"
          >
            <div>
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
              <p className="text-sm text-gray-400">
                Created: {new Date(quiz.created_at).toLocaleDateString("en-us")}
              </p>
              <div className="flex gap-2 mt-2">
                <Link to={`/${quiz.id}`}>
                  <Button className="cursor-pointer">Edit</Button>
                </Link>
                <Button
                  className="cursor-pointer"
                  onClick={() => handleDelete(quiz.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
