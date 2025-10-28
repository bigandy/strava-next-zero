import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStravaUserInformation } from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /api/activities/user/get
 * This Route gets user information for the signed in Strava User.
 * Then upserts into the db the latest changes.
 */
export const GET = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userInformation = await getStravaUserInformation(session.account);

	return NextResponse.json({
		message: "Get User Information",
		userInformation,
	});
};
