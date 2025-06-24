import express from "express";
// import dotenv from "dotenv";
// import User from "../models/user";
import UserRoute from "../routes/UserRoute.js";
// dotenv.config();

const app = express();
app.use(express.json());

app.use("/API",UserRoute)



export default app;
