import { type DetailedActivityResponse, default as strava } from "strava-v3";

import { Activities } from "@/components/activities";

export default async function Page() {
	const payload = await strava.athlete.listActivities({
		access_token: "0e07ba733758954c16206c2a2e52f7c5aa6bdb6d",
	});

	const activities = payload.map((activity: DetailedActivityResponse) => {
		return {
			name: activity.name,
			distance: activity.distance,
			id: activity.id,
			kudos: activity.kudos_count,
			start: activity.start_date_local,
			elevation: activity.total_elevation_gain,
			duration: activity.elapsed_time,
		};
	});

	console.log({ payload });

	return (
		<>
			<h1>Activities</h1>

			<Activities activities={activities} />
		</>
	);
}
