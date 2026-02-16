import "dotenv/config";

interface Env {
	readonly NODE_ENV: string;
	readonly PORT: number;
	readonly DATABASE_URL: string;
	readonly DIRECT_URL: string;
	readonly JWT_SECRET: string;
	readonly JWT_EXPIRES_IN: string;
	readonly JWT_REFRESH_SECRET: string;
	readonly JWT_REFRESH_EXPIRES_IN: string;
	readonly BCRYPT_ROUNDS: number;
}

const getEnv = (): Env => {
	const nodeEnv = process.env.NODE_ENV || "development";
	const port = Number(process.env.PORT || "3000");
	const databaseUrl = process.env.DATABASE_URL;
	const directUrl = process.env.DIRECT_URL;
	const jwtSecret = process.env.JWT_SECRET;
	const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
	const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
	const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
	const bcryptRounds = Number(process.env.BCRYPT_ROUNDS);

	if (!databaseUrl) throw new Error("DATABASE_URL is not defined");
	if (!directUrl) throw new Error("DIRECT_URL is not defined");
	if (!jwtSecret) throw new Error("JWT_SECRET is not defined");
	if (!jwtExpiresIn) throw new Error("JWT_EXPIRES_IN is not defined");
	if (!jwtRefreshSecret) throw new Error("JWT_REFRESH_SECRET is not defined");
	if (!jwtRefreshExpiresIn)
		throw new Error("JWT_REFRESH_EXPIRES_IN is not defined");
	if (!bcryptRounds) throw new Error("BCRYPT_ROUNDS is not defined");

	return {
		NODE_ENV: nodeEnv,
		PORT: port,
		DATABASE_URL: databaseUrl,
		DIRECT_URL: directUrl,
		JWT_SECRET: jwtSecret,
		JWT_EXPIRES_IN: jwtExpiresIn,
		JWT_REFRESH_SECRET: jwtRefreshSecret,
		JWT_REFRESH_EXPIRES_IN: jwtRefreshExpiresIn,
		BCRYPT_ROUNDS: bcryptRounds,
	};
};

export const env = Object.freeze(getEnv());
