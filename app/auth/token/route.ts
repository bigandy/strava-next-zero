// // export const { GET } = handlers;
// // import { eq } from "drizzle-orm";
// import * as jose from "jose";

// import { cookies } from "next/headers";

// // import { redirect } from "next/navigation";
// // import { db } from "@/db";
// // import { users as usersTable } from "@/db/schema";

// const secret = new TextEncoder().encode(process.env.ZERO_AUTH_SECRET!);
// const alg = "HS256" as const;

// export const GET = async ({ request }) => {
// 	console.log({ request });
// 	console.log("getting jwt");
// 	// const cookieStore = await cookies();
// 	// if (cookieStore.get("token")) {
// 	// 	console.log("have token");
// 	// } else {
// 	// 	console.log("no token");
// 	// 	await cookieStore.set("token", "derp");
// 	// }

// 	// console.log({ cookieStore });

// 	// // Create a JWT
// 	// const jwt = await new jose.SignJWT({ sub: userId })
// 	// 	.setProtectedHeader({ alg })
// 	// 	.setIssuedAt()
// 	// 	.setExpirationTime("1h")
// 	// 	.sign(secret);

// 	// cookieStore.set("token", jwt);

// 	// return jwt;
// 	return {
// 		thing: true,
// 	};
// };

// export const dynamic = "force-static";

import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;

export async function GET(req: NextRequest) {
	// passing raw means you get the non-decoded token
	const token = await getToken({ req, secret, raw: true });

	return Response.json({ token });
}
