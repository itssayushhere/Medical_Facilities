import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import DoctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import questionRoute from "./Routes/question.js";
import buyoutRoute from "./Routes/buyout.js";
import bookRoute from './Routes/book.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working for me");
});
//DATABASE CONNECTION
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log("Mongo databse is connection failure");
  }
};
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/v1/auth", authRoute); ///imp
app.use("/api/v1/users", userRoute); ///imp
app.use("/api/v1/doctors", DoctorRoute); ///imp
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/buyout", buyoutRoute);
app.use("/api/v1/book", bookRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});
