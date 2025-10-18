import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import {
	deleteActivities,
	getStravaActivities,
	writeActivitiesToDB,
} from "../utils";

/**
 * /activities/get route
 */
export const GET = async (req, ctx) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return null;
	}

	const stravaActivities = await getStravaActivities(session.account);

	// Delete activities from DB
	await deleteActivities();

	// Put them in the database!
	await writeActivitiesToDB(stravaActivities);

	if (stravaActivities) {
		return NextResponse.json({ activities: stravaActivities });
	} else {
		return NextResponse.json({
			message: "no strava provider, log in with Strava please.",
		});
	}
};
