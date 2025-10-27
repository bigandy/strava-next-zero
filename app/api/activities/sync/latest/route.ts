import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
	getStravaActivities,
	upsertActivitiesToDB,
} from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /activities/sync/latest api route
 * This Route syncs the latest 30 (?) or so activities.
 * Will upsert into the db the latest changes.
 */
export const GET = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const stravaActivities = await getStravaActivities(session.account);

	// Upsert them in the database!
	await upsertActivitiesToDB(stravaActivities);

	return NextResponse.json({
		stravaActivities,
	});
};
