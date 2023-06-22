import express from "express";
import contactRouter from "./routes/contactRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";

dotenv.config();
connectDB();

const app = express();

const port = process.env.PORT || 8000;

// created as a middleware
// below line parses data stream from client on server side i.e req.body
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
