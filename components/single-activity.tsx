"use client";

import { useQuery } from "@rocicorp/zero/react";
import Link from "next/link";
import { useState } from "react";
import { ActivityRow } from "@/components/activity-row";
import { Button } from "@/components/button";
import { useZero } from "@/components/zero";

export const SingleActivity = ({ id }: { id: string }) => {
	const z = useZero();
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [activity] = useQuery(z.query.activities.where("id", id).one());

	const syncActivity = async () => {
		setLoading(true);

		await fetch(`/api/activities/sync/one?id=${id}`);

		setLoading(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("form submit", activity?.description);

		await fetch(`/api/activities/update-strava/one?id=${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description: activity?.description,
				name: activity?.name,
			}),
		});
	};

	const handleNameInput = (e) => {
		const { value } = e.target;
		if (activity?.id) {
			z.mutate.activities.update({
				id: activity.id,
				name: value,
			});
		}
	};

	const handleDescriptionInput = (e) => {
		const { value } = e.target;
		if (activity?.id) {
			z.mutate.activities.update({
				id: activity.id,
				description: value,
			});
		}
	};

	if (!activity) {
		return null;
	}

	return (
		<>
			<h2>Single Activity View</h2>

			<Link href="/activities">&larr; Back to Table</Link>

			<Button
				disabled={loading}
				handleClick={() => syncActivity()}
				className="mx-4"
			>
				Sync Activity
			</Button>

			<Button handleClick={() => setIsEditing((e) => !e)}>Edit?</Button>

			<div className="activities-table">
				{isEditing ? (
					<form onSubmit={handleSubmit}>
						<label htmlFor="name">Activity Name:</label>
						<input
							id="name"
							onInput={handleNameInput}
							value={activity?.name}
							className="border border-black p-4 block w-full"
						></input>

						<label htmlFor="description">Description:</label>
						<textarea
							id="description"
							onInput={handleDescriptionInput}
							value={activity?.description}
							className="border border-black p-4 block w-full"
						></textarea>

						<Button handleClick={() => {}} type="submit" className="mt-4">
							Submit
						</Button>
					</form>
				) : (
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
				)}
			</div>
		</>
	);
};
