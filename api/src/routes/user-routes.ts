import { Router } from "express";
import {
	createUserController,
	deleteUserByIdController,
	getProfileController,
	getUserByIdController,
	getUsersController,
	updateUserByIdController,
} from "../controllers/user-controller.ts";
import { authenticate } from "../middlewares/auth";

export const userRoutes = Router();

userRoutes.get("/profile", authenticate(), getProfileController);
userRoutes.post("/", createUserController);
userRoutes.get("/", authenticate(), getUsersController);
userRoutes.get("/:id", authenticate(), getUserByIdController);
userRoutes.put("/:id", authenticate(), updateUserByIdController);
userRoutes.delete("/:id", authenticate(), deleteUserByIdController);
