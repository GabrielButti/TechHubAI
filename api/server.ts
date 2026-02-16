import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config({
	path: ".env.local",
});

import { userRoutes } from "./src/routes/user-routes.ts";
import { env } from "./src/config/env.ts";

const app = express();
const PORT = env.PORT; // process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/user", userRoutes);
app.get("/health", (req, res) => {
	res.status(200).json({ message: "API is running!" });
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
