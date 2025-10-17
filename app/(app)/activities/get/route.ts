import { auth } from "auth";
import { NextResponse } from "next/server";

import { getStravaActivities } from "../utils";

/**
 * /activities/get route
 */
export const GET = auth(async (req) => {
	if (!req.auth) {
		return null;
	}
	const userId = req.auth.user?.id;

	const stravaActivities = await getStravaActivities(userId!);

	// Delete activities from DB
	// await deleteActivities();

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
