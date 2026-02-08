import { z } from "zod";

export const requestParamsIdSchema = z.object({
	id: z.uuid(),
});
