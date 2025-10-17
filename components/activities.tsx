"use client";

import { useQuery } from "@rocicorp/zero/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useZero } from "@/components/zero";

import { Button } from "./button";

export const Activities = () => {
	const [perPage, setPerPage] = useState(10);

	const searchParams = useSearchParams();

	const initialPage = searchParams.get("page");

	const [page, setPage] = useState(initialPage ? +initialPage : 1);

	const z = useZero();

	const [activities] = useQuery(z.query.activities.orderBy("start", "desc"));

	useEffect(() => {
		window.history.pushState(null, "", `?page=${page}`);
	}, [page]);

	return (
		<>
			<div>
				<Button handleClick={() => setPage((p) => p - 1)} disabled={page === 1}>
					Down
				</Button>
				<div className="inline-block">
					<input
						className="border border-black p-4 mx-4"
						type="number"
						min="1"
						max={activities.length / perPage}
						value={page}
						onInput={(e) => setPage(+e.target.value)}
					/>
				</div>
				<Button handleClick={() => setPage((p) => p + 1)}>Up</Button>

				<div>
					<label htmlFor="perPage">Per Page:</label>
					<input
						className="border border-black p-4 mx-4"
						type="number"
						min="1"
						max="100"
						value={perPage}
						id="perPage"
						onInput={(e) => setPerPage(+e.target.value)}
					/>
				</div>
			</div>
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
						{activities
							.slice((page - 1) * perPage, page * perPage)
							.map((activity) => {
								return <Activity key={activity.id} activity={activity} />;
							})}
					</tbody>
				</table>
			</div>
		</>
	);
};

const Activity = ({ activity }) => {
	return (
		<tr className="border border-black p-4">
			<td>
				<Link
					className="underline text-blue-400"
					href={`https://strava.com/activities/${activity.id}`}
					target="_blank"
				>
					{activity.name}
				</Link>
			</td>
			<td>{(activity.distance / 1000).toFixed(2)} km</td>
			<td>{activity.kudos}</td>
			<td>{activity.start}</td>
			<td>{activity.elevation}m</td>
			<td>{(activity.elapsedTime / 3600) * 60}</td>
			<td>{(activity.movingTime / 3600) * 60}</td>
			<td>{activity.type}</td>
		</tr>
	);
};
