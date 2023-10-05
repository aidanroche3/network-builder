import express from "express";
import path from "path";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(UserController.getAllUsers);

router.route("/page2").get((req, res) => {
  res.sendFile(path.resolve() + "/page2.html");
});

router.route("/css/index.css").get((req, res) => {
  res.sendFile(path.resolve() + "/css/index.css");
});

export default router;
