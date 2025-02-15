import mysql, { Pool } from "mysql2";

import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error(" Database connection failed:", err.message);
      return;
    }
    console.log(" Connected to MySQL Database!");
  });
};

export default connectDB;
