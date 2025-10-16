import { auth } from "auth";
import { NextResponse } from "next/server";
import type { DetailedActivityResponse } from "strava-v3";

import { getStravaClient } from "../utils";

interface Activity extends DetailedActivityResponse {
	type: string;
}
/**
 * This Route will sync the latest 30 (?) or so activities.
 * Will upsert into the db the latest changes.
 */
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = req.auth.userId;

	const strava = await getStravaClient(userId);

	const payload = await strava.athlete.listActivities({
		per_page: 1,
	});

	const stravaActivities = payload.map((activity: Activity) => {
		return {
			name: activity.name,
			distance: activity.distance,
			id: activity.id,
			kudos: activity.kudos_count,
			start: activity.start_date_local,
			elevation: activity.total_elevation_gain,
			description: activity.description,
			type: activity.type,
			athletes: activity.athlete_count,
			elapsedTime: activity.elapsed_time,
			movingTime: activity.moving_time,
		};
	});

	// // Delete while activities DB
	// await db.delete(activities);

	// // Put them in the database!
	// await db.insert(activities).values(
	// 	stravaActivities.map((act) => ({
	// 		id: act.id,
	// 		name: act.name,
	// 		description: act.description,
	// 		kudos: act.kudos,
	// 		start: act.start,
	// 		elapsedTime: act.elapsedTime,
	// 		movingTime: act.movingTime,
	// 		type: act.type,
	// 		elevation: act.elevation,
	// 		distance: act.distance,
	// 	})),
	// );

	return NextResponse.json({
		stravaActivities,
	});
});
