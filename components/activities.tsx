import type { DetailedActivityResponse } from "strava-v3";

// import { useQuery } from "@rocicorp/zero/react";
// import { useZero } from "@/components/zero";

export const Activities = ({
	activities,
}: {
	activities: Array<DetailedActivityResponse>;
}) => {
	return (
		<div className="grid gap-4">
			{activities.map((activity) => {
				//     name: activity.name,
				// distance: activity.distance,
				// id: activity.id,
				// kudos: activity.kudos_count,
				// start: activity.start_date_local,
				// elevation: activity.total_elevation_gain,
				return (
					<div key={activity.id} className="border border-black p-4">
						<div>Name: {activity.name}</div>
						<div>Distance: {(activity.distance / 1000).toFixed(2)} km</div>
						<div>kudos: {activity.kudos}</div>
						<div>start: {activity.start}</div>
						<div>elevation: {activity.elevation}m</div>
						<div>Duration: {(activity.duration / 3600) * 60}</div>
						<div>id: {activity.id}</div>
					</div>
				);
			})}
		</div>
	);
};
