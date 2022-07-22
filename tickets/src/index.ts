import mongoose from "mongoose";
import { app } from "./app";

const port = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  const mongoUrl = process.env.MONGO_URI;
  // const mongoUrl = "mongodb://admin:sandip@localhost:27017/auth";

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
