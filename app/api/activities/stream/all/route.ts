import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAllStravaActivitiesWithStreaming } from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /api/activities/stream/all
 * This Route gets ALL the Strava Activities. And stream back the page number to the user so the UI can be updated.
 * Then upserts into the db the latest changes.
 */

export const GET = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const stream = await getAllStravaActivitiesWithStreaming(session.account);

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			Connection: "keep-alive",
			"Cache-Control": "no-cache, no-transform",
		},
	});
};
