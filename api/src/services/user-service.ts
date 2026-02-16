import { prisma } from "../../lib/prisma";
import type { CreateUserSchema, UpdateUserSchema } from "../schemas";
import { hashPassword } from "../utils/hash-password";
import { generateTokens } from "../utils/jwt";

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
	const user = await prisma.user.create({
		data: { name, email, passwordHash },
	});
	const tokens = generateTokens({ sub: user.id, email: user.email })

	await prisma.user.update({
		where: { id: user.id },
		data: { refreshToken: tokens.refreshToken },
	});

	return { user, tokens };
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
