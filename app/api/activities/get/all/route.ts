import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAllStravaActivities } from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /api/activities/get/all
 * This Route gets ALL the Strava Activities.
 * Then upserts into the db the latest changes.
 */
export const GET = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const syncAll = await getAllStravaActivities(session.account);

	return NextResponse.json({
		message: "Get All Activities",
		syncAll,
	});
};
