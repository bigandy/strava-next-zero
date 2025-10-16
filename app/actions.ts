"use server";

// import { eq } from "drizzle-orm";
import * as jose from "jose";

// import { redirect } from "next/navigation";
// import { db } from "@/db";
// import { users as usersTable } from "@/db/schema";

const secret = new TextEncoder().encode(process.env.ZERO_AUTH_SECRET!);
const alg = "HS256" as const;

// export async function signIn(formData: FormData) {
// 	// Get the request data
// 	const email = formData.get("email") as string | null;
// 	const password = formData.get("password") as string | null;
// 	if (!email || !password) {
// 		throw new Error("username and/or email not set");
// 	}
// 	console.log("email", email, "password", password);

// 	// Query the database
// 	const results = await db
// 		.select()
// 		.from(usersTable)
// 		.where(eq(usersTable.email, email));

// 	const user = results[0];
// 	if (!user) {
// 		throw new Error("email doesn't exist");
// 	}
// 	console.log("user", user);

// 	// Do the passwords match?
// 	if (!(await bcrypt.compare(password, user.passHash))) {
// 		throw new Error("passwords don't match");
// 	}
// 	console.log("passwords match");

// 	// Create a JWT
// 	const jwt = await new jose.SignJWT({ sub: user.id })
// 		.setProtectedHeader({ alg })
// 		.setIssuedAt()
// 		.setExpirationTime("1h")
// 		.sign(secret);

// 	// Set the cookie

// 	// Done!
// 	redirect("/users");
// }

export const getNewToken = async (userId: string) => {
	// Create a JWT
	const jwt = await new jose.SignJWT({ sub: userId })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(secret);

	// CAN ONLY SET COOKIE IN Server Action or Route Handler
	// cookieStore.set("token", jwt);

	return jwt;
};
