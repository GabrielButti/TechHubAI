import type { Request, Response } from "express";

export const createUserController = (req: Request, res: Response) => {
	return res.status(201).json({ message: "User created successfully" });
};
