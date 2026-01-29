import { Router } from "express";
import { createUserController } from "../controllers/user-controller.ts";

export const userRoutes = Router();

userRoutes.post("/", createUserController);
