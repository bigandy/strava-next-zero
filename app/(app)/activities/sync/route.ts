import { auth } from "auth";
import { NextResponse } from "next/server";

import {
	formatStravaActivities,
	getStravaClient,
	// writeActivitiesToDB,
} from "../utils";

/**
 * This Route will sync the latest 30 (?) or so activities.
 * Will upsert into the db the latest changes.
 */
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = req.auth.user?.id;

	const strava = await getStravaClient(userId);

	const payload = await strava.athlete.listActivities({
		per_page: 1,
	});

	const stravaActivities = formatStravaActivities(payload);

	// // Delete while activities DB
	// await db.delete(activities);

	// // Put them in the database!
	// Put them in the database!
	// await writeActivitiesToDB(stravaActivities);

	return NextResponse.json({
		stravaActivities,
	});
});
