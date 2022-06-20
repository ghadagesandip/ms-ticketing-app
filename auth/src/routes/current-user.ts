import express from "express";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  try {
    res.send({ currentUser: req.currentUser || null });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
