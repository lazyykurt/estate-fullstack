import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import postsRouter from "./routes/post.route.js"
import authRouter from "./routes/auth.route.js"
import testRouter from "./routes/test.route.js"
import userRouter from "./routes/user.route.js"

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter)

app.listen(8800, () => {
  console.log("Server is running on port 8800... http://localhost:8800 ");
})
