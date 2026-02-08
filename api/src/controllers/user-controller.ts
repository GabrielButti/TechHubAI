import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { asyncRequestHandler } from "../middlewares/async-request-handler";
import { hashPassword } from "../utils/hash-password";
import { createUserSchema } from "../schemas/create-user-schema";
import { normalizeValidationResponse } from "../utils/normalize-validation-response";
import { requestParamsIdSchema } from "../schemas/request-params-id";

export const getUserById = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) {
		return false;
	}

	return true;
};

export const createUserController = asyncRequestHandler(
	async (req: Request, res: Response) => {
		const { data, success, error } = createUserSchema.safeParse(req.body);

		if (!success) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const { name, email, password } = data;

		const userExists = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userExists) {
			res.status(400).json({ message: "User already exists" });
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

		if (!users) {
			res.status(404).json({ message: "Users not found" });
			return;
		}

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

		if (!success) {
			res.status(400).json(normalizeValidationResponse(error));
			return;
		}

		const userExists = await getUserById(data.id);

		if (!userExists) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await prisma.user.update({
			where: {
				id: data.id,
			},
			data: req.body,
		});

		res.status(201).json({ message: "User updated successfully" });
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

		const userExists = await getUserById(data.id);

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

		res.status(201).json({ message: "User deleted successfully" });
	},
);
