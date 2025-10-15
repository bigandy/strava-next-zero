import { auth } from "auth";
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { type DetailedActivityResponse, default as strava } from "strava-v3";

// import { db } from "@/db";
// import { activities } from "@/db/schema";

interface Activity extends DetailedActivityResponse {
	type: string;
}

export const GET = auth(async (req) => {
	if (!req.auth) {
		return null;
	}

	// const user = await db.query.users.findFirst({ userId: req.auth.userId });

	const payload = await strava.athlete.listActivities({
		access_token: "3b70e86c626ce9f18e0aab193cebba5683d0b717",
	});

	const stravaActivities = payload.map((activity: Activity) => {
		return {
			name: activity.name,
			distance: activity.distance,
			id: activity.id,
			kudos: activity.kudos_count,
			start: activity.start_date_local,
			elevation: activity.total_elevation_gain,
			duration: activity.elapsed_time,
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
	// 		duration: act.duration,
	// 		kudos: act.kudos,
	// 		start: act.start,
	// 		elapsedTime: act.elapsedTime,
	// 		movingTime: act.movingTime,
	// 		type: act.type,
	// 		elevation: act.elevation,
	// 		distance: act.distance,
	// 	})),
	// );

	return NextResponse.json({ activities: stravaActivities });
});
