import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { verifyPassword } from "../utils/hash-password";
import { generateTokens, verifyRefreshToken } from "../utils/jwt";
import type { AuthRequest } from "../types/types";

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({ message: "Email and password are required!" });
			return;
		}

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			res.status(401).json({ message: "Invalid credentials!" });
			return;
		}

		const isPasswordValid = await verifyPassword(password, user.passwordHash);
		if (!isPasswordValid) {
			res.status(401).json({ message: "Invalid credentials!" });
			return;
		}

		const tokens = generateTokens({ sub: user.id, email: user.email });
		await prisma.user.update({
			where: { id: user.id },
			data: { refreshToken: tokens.refreshToken },
		});

		const { passwordHash: _, refreshToken: __, ...userWithoutSensitive } = user;
		res.json({ user: userWithoutSensitive, tokens });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error!" });
	}
};

export const logout = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		if (!req.user) {
			res.status(401).json({ message: "User not authenticated!" });
			return;
		}

		await prisma.user.update({
			where: { id: req.user.id },
			data: { refreshToken: null },
		});

		res.status(204).send();
	} catch (error) {
		console.error("Logout error:", error);
		res.status(500).json({ message: "Internal server error!" });
	}
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			res.status(400).json({ message: "Refresh token is required!" });
			return;
		}

		const payload = verifyRefreshToken(refreshToken);
		if (!payload) {
			res.status(401).json({ message: "Invalid refresh token!" });
			return;
		}

		const user = await prisma.user.findUnique({ where: { id: payload.sub } });
		if (!user || user.refreshToken !== refreshToken) {
			res.status(401).json({ message: "Invalid refresh token!" });
			return;
		}

		const tokens = generateTokens({ sub: user.id, email: user.email });

		await prisma.user.update({
			where: { id: user.id },
			data: { refreshToken: tokens.refreshToken },
		});

		res.json({ tokens });
	} catch (error) {
		console.error("Refresh error:", error);
		res.status(500).json({ message: "Internal server error!" });
	}
};
