import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { updateOneStravaActivity } from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /activities/update-strava/one api route
 * This Route updates Strava activity.
 */
export const POST = async (request: NextRequest) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const data = await request.json();
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ message: "NO-ID" });
	}

	await updateOneStravaActivity(session.account, id, data);

	// // Upsert them in the database!
	// await upsertActivitiesToDB(stravaActivities);

	return NextResponse.json({
		message: "upload-to-strava",
		data,
	});
};
