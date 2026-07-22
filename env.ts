import { z } from "zod";

const envSchema = z.object({
	AUTH_SECRET: z.string(),
	NEXT_PUBLIC_ZERO_SERVER: z.url(),
	ZERO_UPSTREAM_DB: z.url(),
	ZERO_CVR_DB: z.url(),
	ZERO_CHANGE_DB: z.url(),
	ZERO_REPLICA_FILE: z.string(),
	ZERO_AUTH_JWKS_URL: z.url(),

	AUTH_DRIZZLE_URL: z.url(),

	AUTH_STRAVA_ID: z.string(),
	AUTH_STRAVA_SECRET: z.string(),
	AUTH_STRAVA_REDIRECT_URL: z.url(),

	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.url(),

	ZERO_QUERY_URL: z.url(),
	ZERO_MUTATE_URL: z.url()

	// ENV: z.union([
	// 	z.literal("development"),
	// 	z.literal("test"),
	// 	z.literal("production"),
	// ]),
});

// Validate `process.env` using the schema
const env = envSchema.parse(process.env);

export default env;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> { }
	}
}
