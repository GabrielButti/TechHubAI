import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { asyncRequestHandler } from "../middlewares/async-request-handler";
import { hashPassword } from "../utils/hash-password";
import { normalizeValidationResponse } from "../utils/normalize-validation-response";
import { createUserSchema, requestParamsIdSchema } from "../schemas";

export const checkUserExists = async (id: string, email?: string) => {
	const count = await prisma.user.count({ where: { id } });

	if (email) {
		const count = await prisma.user.count({ where: { email } });
		return count > 0;
	}

	return count > 0;
};

export const createUserController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, success, error } = createUserSchema.safeParse(req.body);

		if (!success) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const { name, email, password } = data;

		const userExists = await checkUserExists("", email);

		if (userExists) {
			res.status(409).json({ message: "User already exists" });
			return;
		}

		const passwordHash = await hashPassword(password);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash,
			},
		});

		res.status(201).json({ id: user.id, message: "User created successfully" });
	},
);

export const getUsersController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const users = await prisma.user.findMany({
			where: { status: "ACTIVE" },
			omit: { passwordHash: true },
		});

		res.status(200).json({ message: "Users retrieved successfully", users });
	},
);

export const getUserByIdController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const parsed = requestParamsIdSchema.safeParse(req.params);

		if (!parsed.success) {
			res.status(400).json(normalizeValidationResponse(parsed.error));
			return;
		}

		const user = await prisma.user.findUnique({
			where: {
				id: parsed.data.id,
			},
			omit: { passwordHash: true },
		});

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({ message: "User retrieved successfully", user });
	},
);

export const updateUserByIdController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, success, error } = requestParamsIdSchema.safeParse(
			req.params,
		);

		const { name, email, role, status } = req.body;

		if (!success) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const userExists = await checkUserExists(data.id);

		if (!userExists) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await prisma.user.update({
			where: {
				id: data.id,
			},
			data: {
				name,
				email,
				role,
				status,
			},
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

		await prisma.user.update({
			where: {
				id: data.id,
			},
			data: {
				status: "INACTIVE",
			},
		});

		res.status(200).json({ message: "User deleted successfully" });
	},
);
