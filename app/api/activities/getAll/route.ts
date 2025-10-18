import { auth } from "auth";
import { NextResponse } from "next/server";

import { getAllStravaActivities } from "../utils";

/**
 * This Route will get ALL the Strava Activities.
 * Will upsert into the db the latest changes.
 */
export const GET = auth(async (req) => {
	if (!req.auth) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = req.auth.user.id;

	// await deleteActivities();

	const syncAll = await getAllStravaActivities(userId!);

	return NextResponse.json({
		message: "Get All Activities",
		syncAll,
	});
});
