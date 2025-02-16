import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import authRouter from "./routes/authRoutes.js";
import quizRouter from "./routes/quizRoutes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

//getting the env files
dotenv.config();

//Initialising the app
const app = express();

//connect to db
connectDB();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5175"],
  })
);

//routes
app.use("/api/auth", authRouter);
app.use("/api/quizzes", quizRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
