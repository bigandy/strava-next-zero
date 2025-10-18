"use client";

import { useQuery } from "@rocicorp/zero/react";
import Link from "next/link";
import { useState } from "react";
import { ActivityRow } from "@/components/activity-row";
import { Button } from "@/components/button";
import { useZero } from "@/components/zero";

export const SingleActivity = ({ id }) => {
	const z = useZero();
	const [loading, setLoading] = useState(false);

	const [activity] = useQuery(z.query.activities.where("id", id).one());

	const syncActivity = async () => {
		setLoading(true);

		await fetch(`/api/activities/syncOne?id=${id}`);

		setLoading(false);
	};

	// activities/syncOne?id=16146508452

	if (!activity) {
		return null;
	}

	return (
		<>
			<h2>Single Activity View</h2>

			<Link href="/activities">&larr; Back to Table</Link>

			<Button disabled={loading} handleClick={() => syncActivity()}>
				Sync Activity
			</Button>

			<div className="activities-table">
				<table className="w-full" style={{ tableLayout: "fixed" }}>
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
						</tr>
					</thead>
					<tbody>
						<ActivityRow activity={activity} showEdit={false} />
					</tbody>
				</table>
			</div>
			{/* <Activities /> */}
		</>
	);
};
