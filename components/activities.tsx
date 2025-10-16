"use client";

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";

export const Activities = () => {
	const z = useZero();
	const [activities] = useQuery(z.query.activities.orderBy("id", "desc"));

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
						<div>Elapsed Time: {(activity.elapsedTime / 3600) * 60}</div>
						<div>Moving Time: {(activity.movingTime / 3600) * 60}</div>
						{/* <div>id: {activity.id}</div> */}
						<div>Type: {activity.type}</div>
						<div>Is Private? {activity.isPrivate ? "yes" : "no"}</div>
					</div>
				);
			})}
		</div>
	);
};
