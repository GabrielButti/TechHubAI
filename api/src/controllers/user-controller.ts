import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createUserController = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});
		return res
			.status(201)
			.json({ id: user.id, message: "User created successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getUsersController = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany({
			where: { status: "ACTIVE" },
			omit: { password: true },
		});
		return res
			.status(200)
			.json({ message: "Users retrieved successfully", users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserByIdController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "User ID is required" });
		}

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		return res
			.status(200)
			.json({ message: "User retrieved successfully", user });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const updateUserByIdController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		await prisma.user.update({
			where: {
				id,
			},
			data: req.body,
		});
		return res.status(201).json({ message: "User updated successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteUserByIdController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;

		await prisma.user.update({
			where: {
				id,
			},
			data: {
				status: "INACTIVE",
			},
		});
		return res.status(201).json({ message: "User deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
