import type { NextFunction, Request, Response } from "express";
import type { UserModel } from "../../generated/prisma/models";

export type RequestParams = {
	id?: string;
};

export type AsyncRequestHandler = (
	req: Request<RequestParams>,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export type JwtPayload = {
	readonly sub: string;
	readonly email: string;
};

export type AuthTokens = {
	readonly accessToken: string;
	readonly refreshToken: string;
};

export type UserWithoutPassword = Omit<
	UserModel,
	"passwordHash" | "refreshToken"
>;

export interface AuthRequest extends Request {
	user?: UserWithoutPassword;
}
