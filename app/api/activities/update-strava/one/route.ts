import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { updateOneStravaActivity } from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /activities/update-strava/one api route
 * This Route updates Strava activity.
 */
export const POST = async (request, ctx) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const data = await request.json();
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	await updateOneStravaActivity(session.account, id, data);

	// // Upsert them in the database!
	// await upsertActivitiesToDB(stravaActivities);

	return NextResponse.json({
		message: "upload-to-strava",
		data,
	});
};
