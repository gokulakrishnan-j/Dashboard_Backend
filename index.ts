import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.route.js";

dotenv.config();

// calling express
const app = express();

// using body parser
app.use(express.json());

// cors is allowing send a response
app.use(cors());

// server port
const PORT = process.env.PORT;

app.use("/v1/user", userRouter);
// Starting server
app.listen(PORT, console.log(`Sever starts in PORT ${PORT}✨`));
