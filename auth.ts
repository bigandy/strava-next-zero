import NextAuth from "next-auth";
import "next-auth/jwt";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Strava from "next-auth/providers/strava";
import { getNewToken } from "./app/actions";
import { db } from "./db";
import { accounts, users } from "./db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
	debug: !!process.env.AUTH_DEBUG,
	theme: { logo: "https://authjs.dev/img/logo-sm.png" },
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		// sessionsTable: sessions,
	}),
	providers: [
		GitHub,
		Strava({
			authorization: { params: { scope: "activity:read_all,activity:write" } },
		}),
	],
	basePath: "/auth",
	session: { strategy: "jwt" },
	callbacks: {
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl;
			if (pathname === "/middleware-example") return !!auth;
			return true;
		},
		jwt({ token, trigger, session }) {
			// console.log("JWT", { token, trigger, session });
			if (trigger === "update") token.name = session.user.name;
			return token;
		},
		async session({ session, token }) {
			const userId = token.sub;
			const outToken = await getNewToken(userId);
			// const outToken =
			// 	"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjOGEwYmY5Ny04Yjc2LTQxMmUtYmY4YS0xNTBmMmZiZjg0MWIiLCJpYXQiOjE3NjA0NTc3MDMsImV4cCI6MTc2MDQ2MTMwM30.FIbupqFh41GMCMdn_b0fWsHMvi9BB5YullyQ3lsfYNc";

			if (userId) {
				session.userId = userId;
			}

			return { ...session, token: outToken };
		},
	},
	experimental: { enableWebAuthn: true },
});

declare module "next-auth" {
	interface Session {
		accessToken?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
	}
}
