"use client";

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";

export const Activities = () => {
	const z = useZero();
	const [activities] = useQuery(
		z.query.activities.orderBy("id", "desc"),
		// .limit(10),
	);

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Distance</th>
					<th>Kudos</th>
					<th>Start</th>
					<th>Elevation</th>
					<th>Elapsed</th>
					<th>Moving</th>
					<th>Type</th>
					<th>Private?</th>
				</tr>
			</thead>
			<tbody>
				{activities.map((activity) => {
					return <Activity key={activity.id} activity={activity} />;
				})}
			</tbody>
		</table>
	);
};

const Activity = ({ activity }) => {
	return (
		<tr className="border border-black p-4">
			<td>{activity.name}</td>
			<td>{(activity.distance / 1000).toFixed(2)} km</td>
			<td>{activity.kudos}</td>
			<td>{activity.start}</td>
			<td>{activity.elevation}m</td>
			<td>{(activity.elapsedTime / 3600) * 60}</td>
			<td>{(activity.movingTime / 3600) * 60}</td>
			<td>{activity.type}</td>
			<td>{activity.isPrivate ? "yes" : "no"}</td>
		</tr>
	);
};
