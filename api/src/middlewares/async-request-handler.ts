import type { Request, Response, NextFunction } from "express";
import type { AsyncRequestHandler } from "../types/types";

export const asyncRequestHandler = <P, ResBody>(fn: AsyncRequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
