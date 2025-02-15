import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";

import { pool } from "../db/db.js";
import AppError from "../utils/AppError.js";
import { RowDataPacket } from "mysql2";

export const creatQuiz = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, teacher_id } = req.body;

    if (!title || !description || !teacher_id) {
      return next(new AppError("All fields are required", 400));
    }

    const [result] = await pool.execute(
      "INSERT INTO quizzes (title,description,teacher_id) VALUES (?,?,?)",
      [title, description, teacher_id]
    );

    res.status(201).json({
      message: "Quiz created successfully",
      quizzes: {
        result,
      },
    });
  }
);

export const getAllQuizzes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [rows] = await pool.execute("SELECT * FROM quizzes");

    res.status(200).json({
      status: "success",
      data: rows,
    });
  }
);

export const getQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const [rows]: [RowDataPacket[], unknown] = await pool.execute(
    "SELECT * FROM quizzes WHERE id = ?",
    [id]
  );

  //If no quiz found, return 404
  if (rows.length === 0) {
    return next(new AppError("Quiz not found", 404));
  }
  //return the quiz data
  res.status(200).json({
    status: "success",
    data: rows[0],
  });
});

export const updateQuiz = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { title, description } = req.body;

    // Debugging log
    console.log("Request Body:", req.body);

    if (!title && !description) {
      return next(
        new AppError(
          "At least one field (title or description) is required to update",
          400
        )
      );
    }

    // Default undefined values to null
    title = title ?? null;
    description = description ?? null;

    // Check if quiz exists
    const [rows]: [RowDataPacket[], unknown] = await pool.execute(
      "SELECT * FROM quizzes WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return next(new AppError("Quiz not found", 404));
    }

    // Update the quiz (only set fields that are provided)
    await pool.execute(
      "UPDATE quizzes SET title = COALESCE(?, title), description = COALESCE(?, description) WHERE id = ?",
      [title, description, id]
    );

    // Fetch updated quiz
    const [updatedRows]: [RowDataPacket[], unknown] = await pool.execute(
      "SELECT * FROM quizzes WHERE id = ?",
      [id]
    );

    res.status(200).json({
      status: "success",
      quiz: updatedRows[0],
    });
  }
);

export const deleteQuiz = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    //check fi quiz exists
    const [rows]: [RowDataPacket[], unknown] = await pool.execute(
      "SELECT * FROM quizzes WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return next(new AppError("Quiz not found", 404));
    }
    // Delete the quiz
    await pool.execute("DELETE FROM quizzes WHERE id = ?", [id]);

    res.status(200).json({
      status: "success",
      message: "Quiz deleted successfully",
    });
  }
);
