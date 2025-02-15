import { NextFunction, Request, Response } from "express";
import AppError from "./../utils/AppError.js";
import catchAsync from "./../utils/catchAsync.js";
import { pool } from "./../db/db.js";

import { RowDataPacket } from "mysql2/promise"; // Ensure it's from mysql2/promise

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Username and password are required", 400));
    }

    try {
      // Execute the query and explicitly type the result
      const [rows]: [RowDataPacket[], unknown] = await pool.execute<
        RowDataPacket[]
      >("SELECT * FROM users WHERE username = ?", [username]);

      const user = rows[0];

      if (!user || user.password !== password) {
        return next(new AppError("Invalid credentials", 401));
      }

      res.status(200).json({
        message: "Login successful.",
      });
    } catch (error) {
      return next(new AppError("Database error", 500));
    }
  }
);
