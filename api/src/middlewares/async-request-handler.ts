import type { Request, Response, NextFunction } from "express";

export type RequestParams = {
	id?: string;
};

type AsyncRequestHandler = (
	req: Request<RequestParams>,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export const asyncRequestHandler = <P, ResBody>(fn: AsyncRequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
