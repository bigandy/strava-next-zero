"use client";

import { escapeLike } from "@rocicorp/zero";
import { useQuery } from "@rocicorp/zero/react";
import { useDebounceValue } from "usehooks-ts";
import { useZero } from "@/components/zero";
import { ActivityRow } from "./activity-row";

export const ActivitiesWithSearch = () => {
	const z = useZero();

	const [search, setValue] = useDebounceValue("", 100);

	const [activities] = useQuery(
		z.query.activities
			.orderBy("start", "desc")
			.where(({ cmp }) => cmp("name", "ILIKE", `%${escapeLike(search)}%`)),
	);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<>
			<div className="my-10">
				<input
					className="border border-black p-4 w-full"
					type="text"
					defaultValue=""
					onChange={handleInput}
				/>
			</div>
			{search !== "" && (
				<div>
					<strong>{activities.length}</strong> activities featuring{" "}
					<strong>{search}</strong>
				</div>
			)}

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
						{activities.length > 0 ? (
							activities.map((activity) => {
								return <ActivityRow key={activity.id} activity={activity} />;
							})
						) : (
							<tr>
								<td colSpan={9} className="!text-center">
									No Activities
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};
