import express from "express";
import { addUser, listUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", listUsers);

export default router;
