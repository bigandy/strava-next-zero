import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession, genericOAuth } from "better-auth/plugins";
import { db } from "@/db"; // your drizzle instance
import { getNewToken } from "../app/actions";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
	}),

	socialProviders: {
		github: {
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		},
	},

	account: {
		accountLinking: {
			enabled: true,
			allowDifferentEmails: true,
			trustedProviders: ["github", "strava"],
		},
		fields: {
			accountId: "providerAccountId",
			refreshToken: "refresh_token",
			accessToken: "access_token",
			accessTokenExpiresAt: "access_token_expires",
			idToken: "id_token",
		},
	},

	plugins: [
		genericOAuth({
			config: [
				{
					providerId: "strava",
					responseMode: "query",
					clientId: process.env.AUTH_STRAVA_ID!,
					clientSecret: process.env.AUTH_STRAVA_SECRET!,
					redirectURI: `${process.env.AUTH_STRAVA_REDIRECT_URL}/api/auth/oauth2/callback/strava`,
					authorizationUrl: "https://www.strava.com/oauth/authorize",
					tokenUrl: "https://www.strava.com/oauth/token",
					userInfoUrl: "https://www.strava.com/api/v3/athlete",
					scopes: ["activity:read_all,activity:write"],

					async getUserInfo(tokens) {
						const data = await fetch("https://www.strava.com/api/v3/athlete", {
							headers: { Authorization: `Bearer ${tokens.accessToken}` },
						}).then((data) => data.json());
						console.log({ data });
						return {
							...data,
							email: data.username, // This is required to fix the error, even though it makes no sense b/c it isn't an email
							emailVerified: true,
							name: `${data.firstname} ${data.lastname}`,
						};
					},
				},
			],
		}),
		customSession(async ({ user, session }) => {
			const account = await db.query.account.findFirst({
				where: (account, { eq }) => eq(account.userId, user.id),
			});

			const getJWTToken = await getNewToken(user.id);

			// console.log({ account });
			// const roles = findUserRoles(session.session.userId);
			return {
				// roles,
				user: {
					...user,
					newField: "newField",
				},
				session,
				account,
				token: getJWTToken,
			};
		}),
	],
	baseURL: process.env.BETTER_AUTH_URL,
});
