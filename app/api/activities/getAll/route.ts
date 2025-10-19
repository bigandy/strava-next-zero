import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import { getAllStravaActivities } from "../utils";

/**
 * This Route will get ALL the Strava Activities.
 * Will upsert into the db the latest changes.
 */
export const GET = async (req) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const syncAll = await getAllStravaActivities(session.account);

	return NextResponse.json({
		message: "Get All Activities",
		syncAll,
	});
};
