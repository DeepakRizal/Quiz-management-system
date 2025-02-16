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
  console.log(quizzes);

  useEffect(() => {
    const getAllQuizzes = async () => {
      const {
        data: { data },
      }: { data: { data: Quiz[] } } = await axios.get(`${apiUrl}/quizzes`);
      console.log(data);

      setQuizzes(data);
    };
    getAllQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
      <Link to={"/create"}>
        <Button className="mb-4 cursor-pointer">Create New Quiz</Button>
      </Link>
      <div className="grid grid-cols-2 gap-5">
        {quizzes?.map((quiz) => (
          <div key={quiz.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.description}</p>
            <p className="text-sm text-gray-400">
              Created: {new Date(quiz.created_at).toLocaleDateString("en-us")}
            </p>
            <div className="flex gap-2 mt-2">
              <Link to={`/edit/${quiz.id}`}>
                <Button className="cursor-pointer">Edit</Button>
              </Link>
              <Button
                className="cursor-pointer"
                onClick={() => console.log("Delete logic here")}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
