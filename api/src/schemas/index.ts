import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.email(),
	password: z.string().min(12).max(128),
});

export const requestParamsIdSchema = z.object({
	id: z.uuid(),
});

export const updateUserSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.email(),
	role: z.enum(["ADMIN", "USER"]),
	status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type RequestParamsIdSchema = z.infer<typeof requestParamsIdSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
