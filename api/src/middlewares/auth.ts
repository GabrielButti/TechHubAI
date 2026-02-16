import type { NextFunction, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { prisma } from "../../lib/prisma";
import type { AuthRequest, UserWithoutPassword } from "../types/types";

export const authenticate = () => {
	return async (
		req: AuthRequest,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith("Bearer ")) {
			res.status(401).json({ message: "User unauthorized!" });
			return;
		}

		const token = authHeader.substring(7);
		const payload = verifyAccessToken(token);

		if (!payload) {
			res.status(401).json({ message: "Invalid token!" });
			return;
		}

		const user = await prisma.user.findUnique({
			where: { id: payload.sub },
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

        if (!user) {
            res.status(401).json({ message: "User not found!" })
            return
        }

        req.user = user as UserWithoutPassword
        next()
	};
};
