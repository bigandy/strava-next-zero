import { auth } from "auth";
import { NextResponse } from "next/server";

import { getOneStravaActivity, upsertActivitiesToDB } from "../utils";

/**
 * /activities/sync-one api route
 * This Route syncs the activity with the passed id
 * Will upsert into the db the latest changes.
 */
export const GET = auth(async (request) => {
	if (!request.auth) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = request.auth.user?.id;

	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	const stravaActivity = await getOneStravaActivity(userId!, id!);

	// Upsert them in the database!
	await upsertActivitiesToDB(stravaActivity);

	return NextResponse.json({
		id,
		stravaActivity,
	});
});
