import { auth } from "auth";
import { NextResponse } from "next/server";

import {
	formatStravaActivities,
	getStravaClient,
	// writeActivitiesToDB
} from "../utils";

export const GET = auth(async (req) => {
	if (!req.auth) {
		return null;
	}
	const userId = req.auth.user?.id;
	// const user = await db.query.users.findFirst({ userId: req.auth.userId });
	const strava = await getStravaClient(userId);
	const payload = await strava?.athlete.listActivities({});

	const stravaActivities = formatStravaActivities(payload);

	// // Delete while activities DB
	// await db.delete(activities);

	// Put them in the database!
	// await writeActivitiesToDB(stravaActivities);

	if (stravaActivities) {
		return NextResponse.json({ activities: stravaActivities });
	} else {
		return NextResponse.json({
			message: "no strava provider, log in with Strava please.",
		});
	}
});
