import express from "express";
import cookieParser from "cookie-parser";
import postsRouter from "./routes/post.route.js"
import authRouter from "./routes/auth.route.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postsRouter);
app.use("/api/auth", authRouter);

app.listen(8800, () => {
  console.log("Server is running on port 8800... http://localhost:8800 ");
})
