import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/types";
import { env } from "../config/env";

const signToken = (
	payload: JwtPayload,
	secret: string,
	expiresIn: string,
): string => {
	// @ts-ignore: TypeScript is not recognizing the expiresIn property
	return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = <T>(token: string, secret: string): T | null => {
	try {
		return jwt.verify(token, secret) as T;
	} catch (error) {
		return null;
	}
};

export const generateTokens = (payload: JwtPayload) => {
	return {
		accessToken: signToken(payload, env.JWT_SECRET, env.JWT_EXPIRES_IN),
		refreshToken: signToken(
			payload,
			env.JWT_REFRESH_SECRET,
			env.JWT_REFRESH_EXPIRES_IN,
		),
	};
};

export const verifyAccessToken = (token: string) =>
	verifyToken<JwtPayload>(token, env.JWT_SECRET);

export const verifyRefreshToken = (token: string) =>
	verifyToken<JwtPayload>(token, env.JWT_REFRESH_SECRET);
