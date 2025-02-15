import {
  creatQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
} from "../controllers/quizzController.js";
import express from "express";

const router = express.Router();

router.route("/").post(creatQuiz).get(getAllQuizzes);

router.route("/:id").get(getQuiz).put(updateQuiz).delete(deleteQuiz);

export default router;
