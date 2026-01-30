import { Router } from "express";
import {
	createUserController,
	deleteUserByIdController,
	getUserByIdController,
	getUsersController,
	updateUserByIdController,
} from "../controllers/user-controller.ts";

export const userRoutes = Router();

userRoutes.post("/", createUserController);
userRoutes.get("/", getUsersController);
userRoutes.get("/:id", getUserByIdController);
userRoutes.put("/:id", updateUserByIdController);
userRoutes.delete("/:id", deleteUserByIdController);
