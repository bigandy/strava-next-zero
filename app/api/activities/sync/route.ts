import { auth } from "auth";
import { NextResponse } from "next/server";

import { getStravaActivities, upsertActivitiesToDB } from "../utils";

/**
 * /activities/sync api route
 * This Route syncs the latest 30 (?) or so activities.
 * Will upsert into the db the latest changes.
 */
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = req.auth.user?.id;

	const stravaActivities = await getStravaActivities(userId!);

	// Upsert them in the database!
	await upsertActivitiesToDB(stravaActivities);

	return NextResponse.json({
		stravaActivities,
	});
});
