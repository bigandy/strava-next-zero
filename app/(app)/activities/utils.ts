import { eq } from "drizzle-orm";
import { default as strava } from "strava-v3";

import { db } from "@/db";

import { accounts } from "@/db/schema";

const nowEpoc = () => Math.floor(Date.now()) / 1000;

const getAccessToken = async ({ userId }) => {
	const account = await db.query.accounts.findFirst({
		userId,
	});

	const now = nowEpoc();
	const expires = account.expires_at;
	if (now > expires) {
		console.log("NEED NEW TOKEN");

		strava.config({
			access_token: account.access_token!,
			client_id: process.env.AUTH_STRAVA_ID!,
			client_secret: process.env.AUTH_STRAVA_SECRET!,
			redirect_uri: process.env.AUTH_STRAVA_REDIRECT_URL!,
		});

		const { access_token, refresh_token, expires_at } =
			await strava.oauth.refreshToken(account.refresh_token);

		await db
			.update(accounts)
			.set({ refresh_token, access_token, expires_at })
			.where(eq(accounts.userId, userId));

		return access_token;
	}

	return account.access_token;
};

export const getStravaClient = async (userId: string) => {
	const accessToken = await getAccessToken({ userId });
	const client = new strava.client(accessToken);
	return client;
};
