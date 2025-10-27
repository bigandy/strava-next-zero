import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
	getOneStravaActivity,
	upsertActivitiesToDB,
} from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /activities/sync/one api route
 * This Route syncs the activity with the passed id
 * Will upsert into the db the latest changes.
 */
export const GET = async (request: NextRequest) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ message: "NO-ID" });
	}

	const stravaActivity = await getOneStravaActivity(session.account, id);

	// Upsert them in the database!
	await upsertActivitiesToDB(stravaActivity);

	return NextResponse.json({
		id,
		stravaActivity,
	});
};
