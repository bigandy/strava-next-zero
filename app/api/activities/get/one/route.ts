import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
	getOneRawStravaActivity,
	upsertActivitiesToDB,
} from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /activities/get/one api route
 * This Route gets the activity with the passed id
 */
export const GET = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ message: "NO-ID" });
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const stravaActivity = await getOneRawStravaActivity(session.account, id);

	// Upsert them in the database!
	await upsertActivitiesToDB(stravaActivity);

	return NextResponse.json({
		id,
		stravaActivity,
	});
};
