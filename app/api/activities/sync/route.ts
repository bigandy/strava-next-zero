import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import { getStravaActivities, upsertActivitiesToDB } from "../utils";

/**
 * /activities/sync api route
 * This Route syncs the latest 30 (?) or so activities.
 * Will upsert into the db the latest changes.
 */
export const GET = async (req) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const userId = req.auth.user?.id;

	const stravaActivities = await getStravaActivities(userId!);

	// Upsert them in the database!
	await upsertActivitiesToDB(stravaActivities);

	return NextResponse.json({
		stravaActivities,
	});
};
