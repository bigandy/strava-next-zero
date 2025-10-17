import { auth } from "auth";
import { NextResponse } from "next/server";
import type { DetailedActivityResponse } from "strava-v3";

import {
	deleteActivities,
	getAllStravaActivities,
	getStravaClient,
} from "../utils";

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

	await deleteActivities();

	const syncAll = await getAllStravaActivities(userId);

	return NextResponse.json({
		message: "To Do",
		// auth: req.auth,
		syncAll,
	});
});
