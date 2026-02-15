import { prisma } from "../../lib/prisma";
import type { CreateUserSchema, UpdateUserSchema } from "../schemas";
import { hashPassword } from "../utils/hash-password";

export const checkUserExists = async (id: string, email?: string) => {
	const count = await prisma.user.count({ where: { id } });
	if (email) {
		const count = await prisma.user.count({ where: { email } });
		return count > 0;
	}

	return count > 0;
};

export const createUserService = async ({
	name,
	email,
	password,
}: CreateUserSchema) => {
	const passwordHash = await hashPassword(password);

	return prisma.user.create({
		data: { name, email, passwordHash },
	});
};

export const getUsersService = async () => {
	return prisma.user.findMany({
		where: { status: "ACTIVE" },
		omit: { passwordHash: true },
	});
};

export const getUserByIdService = async (id: string) => {
	return prisma.user.findUnique({
		where: { id },
		omit: { passwordHash: true },
	});
};

export const updateUserByIdService = async (
	id: string,
	data: Partial<UpdateUserSchema>,
) => {
	return prisma.user.update({
		where: { id },
		data,
	});
};

export const deleteUserByIdService = async (id: string) => {
	return prisma.user.update({
		where: { id },
		data: { status: "INACTIVE" },
	});
};
