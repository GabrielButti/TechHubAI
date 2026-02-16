import type { Request, Response } from "express";
import { asyncRequestHandler } from "../middlewares/async-request-handler";
import { normalizeValidationResponse } from "../utils/normalize-validation-response";
import { createUserSchema, requestParamsIdSchema } from "../schemas";
import {
	checkUserExists,
	createUserService,
	deleteUserByIdService,
	getUserByIdService,
	getUsersService,
	updateUserByIdService,
} from "../services/user-service";
import type { AuthRequest } from "../types/types";

export const createUserController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, success, error } = createUserSchema.safeParse(req.body);
		if (!success) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const userExists = await checkUserExists("", data.email);
		if (userExists) {
			res.status(409).json({ message: "User already exists" });
			return;
		}

		const { user, tokens } = await createUserService(data);
		res
			.status(201)
			.json({ id: user.id, tokens, message: "User created successfully" });
	},
);

export const getUsersController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const users = await getUsersService();
		res.status(200).json({ message: "Users retrieved successfully", users });
	},
);

export const getProfileController = asyncRequestHandler(
	async (req: AuthRequest, res: Response) => {
		if (!req.user) {
			res.status(401).json({ message: "User not authenticated!" });
			return;
		}

		res.json({ user: req.user });
	},
);

export const getUserByIdController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, error } = requestParamsIdSchema.safeParse(req.params);
		if (error) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const user = await getUserByIdService(data.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({ message: "User retrieved successfully", user });
	},
);

export const updateUserByIdController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, error } = requestParamsIdSchema.safeParse(req.params);
		const { name, email, role, status } = req.body;
		if (error) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const userExists = await checkUserExists(data.id);
		if (!userExists) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await updateUserByIdService(data.id, {
			name,
			email,
			role,
			status,
		});

		res.status(200).json({ message: "User updated successfully" });
	},
);

export const deleteUserByIdController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, success, error } = requestParamsIdSchema.safeParse(
			req.params,
		);
		if (!success) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const userExists = await checkUserExists(data.id);
		if (!userExists) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await deleteUserByIdService(data.id);

		res.status(200).json({ message: "User deleted successfully" });
	},
);
