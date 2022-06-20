import mongoose from "mongoose";
import { app } from "./app";

const port = 3000;
const mongoUrl = "mongodb://auth-mongo-srv:27017/auth";
// const mongoUrl = "mongodb://admin:sandip@localhost:27017/auth";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect(mongoUrl);
    console.log("connected to mongodb");
  } catch (err) {
    console.log("err", err);
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port} !!!`);
  });
};

start();
