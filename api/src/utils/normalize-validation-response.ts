import type { ZodError } from "zod";

export const normalizeValidationResponse = (error: ZodError) => {
	const errors = error?.issues.map((issue) => issue.message);

	return {
		errors,
	};
};
