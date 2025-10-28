import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStravaActivities } from "@/app/api/activities/utils";
import { auth } from "@/lib/auth";

/**
 * /activities/get/latest/raw route
 *
 */
export const GET = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.account) {
		return NextResponse.json({ message: "NO-AUTH" });
	}

	const stravaActivities = await getStravaActivities(
		session.account,
		{},
		false,
	);

	if (stravaActivities) {
		return NextResponse.json({ activities: stravaActivities });
	} else {
		return NextResponse.json({
			message: "no strava provider, log in with Strava please.",
		});
	}
};
