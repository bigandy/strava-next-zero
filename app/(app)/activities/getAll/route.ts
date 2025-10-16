import { auth } from "auth";
import { NextResponse } from "next/server";
import type { DetailedActivityResponse } from "strava-v3";

import { getAllStravaActivities, getStravaClient } from "../utils";

interface Activity extends DetailedActivityResponse {
	type: string;
}

/**
 * This Route will get ALL the Strava Activities.
 * Will upsert into the db the latest changes.
 */
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = req.auth.user.id;

	const strava = await getStravaClient(userId);

	const syncAll = await getAllStravaActivities(userId);

	// const stravaActivities = payload.map((activity: Activity) => {
	// 	return {
	// 		name: activity.name,
	// 		distance: activity.distance,
	// 		id: activity.id,
	// 		kudos: activity.kudos_count,
	// 		start: activity.start_date_local,
	// 		elevation: activity.total_elevation_gain,
	// 		description: activity.description,
	// 		type: activity.type,
	// 		athletes: activity.athlete_count,
	// 		elapsedTime: activity.elapsed_time,
	// 		movingTime: activity.moving_time,
	// 	};
	// });

	// // Delete while activities DB
	// await db.delete(activities);

	// // Put them in the database!

	return NextResponse.json({
		message: "To Do",
		// auth: req.auth,
		syncAll,
	});
});
