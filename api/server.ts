import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config({
	path: ".env.local",
});

import { userRoutes } from "./src/routes/user-routes.ts";
import { env } from "./src/config/env.ts";
import { authRouter } from "./src/routes/auth-routes.ts";
import { prisma } from "./lib/prisma.ts";

const app = express();
const PORT = env.PORT;

// TODO: Configurar devidamente CORS para produção e discutir regras com o time
app.use(cors({ origin: "*" }));

// TODO: Configurar devidamente Helmet para produção e discutir regras com o time
app.use(helmet());

// TODO: Implementar rate limiting e discutir sobre as regras com o time

app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
	res.status(200).json({ message: "API is running!" });
});

app.use("/auth", authRouter);
app.use("/user", userRoutes);

app.use((_req: Request, res: Response) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.log("Unhandled error: ", err);
	res.status(500).json({ message: "Internal server error" });
});

const start = async () => {
	try {
		app.listen(env.PORT, () => {
			console.log(`Server is running at http://localhost:${env.PORT}`);
		});
	} catch (error) {
		console.log("Error starting server: ", error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

start();
