import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getAllTransactions,
} from "../controllers/admin-controller.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";
router.route("/users").get(adminMiddleware, getAllUsers);
router.route("/transactions").get(getAllTransactions);
export default router;
