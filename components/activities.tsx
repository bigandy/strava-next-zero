"use client";

import { useQuery } from "@rocicorp/zero/react";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useZero } from "@/components/zero";
import { ActivityRow } from "./activity-row";
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
				<Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
					Down
				</Button>
				<div className="inline-block">
					<input
						className="border border-black p-4 mx-4"
						type="number"
						min="1"
						max={activities.length / perPage}
						value={page}
						onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
							setPage(+event.target.value)
						}
					/>
				</div>
				<Button onClick={() => setPage((p) => p + 1)}>Up</Button>

				<div>
					<label htmlFor="perPage">Per Page:</label>
					<input
						className="border border-black p-4 mx-4"
						type="number"
						min="1"
						max="100"
						value={perPage}
						id="perPage"
						onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
							setPerPage(+event.target.value)
						}
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
							<th>Edit?</th>
						</tr>
					</thead>
					<tbody>
						{activities
							.slice((page - 1) * perPage, page * perPage)
							.map((activity) => {
								return <ActivityRow key={activity.id} activity={activity} />;
							})}
					</tbody>
				</table>
			</div>
		</>
	);
};
