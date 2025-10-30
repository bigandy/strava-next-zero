"use client";

import { useQuery } from "@rocicorp/zero/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";
import { useZero } from "@/components/zero";
import { SingleActivityTable } from "./single-activity-table";

const MapComponent = dynamic(
	() =>
		import("./ActivitiesMap/single-activity-map").then(
			(module) => module.SingleActivitiesMap,
		),
	{
		// ssr: false,
		loading: () => (
			<div className="leaflet-container leaflet-container--loading">
				<div>Loading...</div>
			</div>
		),
	},
);

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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

	const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (activity?.id) {
			z.mutate.activities.update({
				id: activity.id,
				name: value,
			});
		}
	};

	const handleDescriptionInput = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const { value } = event.target;
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

			<Link href={"/activities/"}>&larr; Back to Table</Link>

			<Button
				disabled={loading}
				onClick={() => syncActivity()}
				className="mx-4"
			>
				Sync Activity
			</Button>

			<Button onClick={() => setIsEditing((e) => !e)}>Edit?</Button>

			<div className="activity-table">
				{isEditing && (
					<form onSubmit={handleSubmit}>
						<label htmlFor="name">Activity Name:</label>
						<input
							id="name"
							onInput={handleNameInput}
							defaultValue={activity?.name}
							className="border border-black p-4 block w-full"
						></input>

						<label htmlFor="description">Description:</label>
						<textarea
							id="description"
							onInput={handleDescriptionInput}
							value={activity?.description ?? ""}
							className="border border-black p-4 block w-full"
						></textarea>

						<Button onClick={() => {}} type="submit" className="mt-4">
							Submit
						</Button>
					</form>
				)}

				{!isEditing && activity && <SingleActivityTable activity={activity} />}
			</div>
			<div className="my-4">
				{activity.startCoords && (
					<MapComponent
						polyline={activity.summaryPolyline}
						coords={activity.startCoords}
					/>
				)}
			</div>
		</>
	);
};
