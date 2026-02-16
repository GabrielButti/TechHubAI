import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth-controller";
import { authenticate } from "../middlewares/auth";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/refresh", authenticate(), refresh);
authRouter.post("/logout", authenticate(), logout);
