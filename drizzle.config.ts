import type { Config } from 'drizzle-kit';

import "dotenv/config";

export default {
	out: "./drizzle",
	schema: "./db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.ZERO_UPSTREAM_DB,
	},
} satisfies Config;
