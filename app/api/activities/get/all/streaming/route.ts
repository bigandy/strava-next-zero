import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAllStravaActivitiesWithStreaming } from "@/app/api/activities/streaming-utils";
import { auth } from "@/lib/auth";

/**
 * /api/activities/get/all/streaming
 * This Route gets ALL the Strava Activities. And stream back to the user.
 * Then upserts into the db the latest changes.
 */

export const GET = async () => {
	const responseStream = new TransformStream();

	const writer = responseStream.writable.getWriter();

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	await getAllStravaActivitiesWithStreaming(session.account, 2);

	writer.close();

	return new Response(responseStream.readable, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache, no-transform",
			Connection: "keep-alive",
		},
	});
};
