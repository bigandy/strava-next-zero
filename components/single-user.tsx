"use client";
import { useQuery } from "@rocicorp/zero/react";
import { useState } from "react";
import { Button } from "@/components/button";
import { useZero } from "@/components/zero";
import { useSession } from "@/lib/auth-client";
import { ActivitiesMap } from "./ActivitiesMap";

export const User = ({ id }: { id: string }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const z = useZero();
	const session = useSession();

	const [user] = useQuery(
		z.query.user.related("provider").where("id", "=", id).one(),
	);

	// const [activities] = useQuery(z.query.activities);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		if (!user) {
			console.error("no user defined");
			return;
		}
		z.mutate.user.update({
			id: user?.id,
			name: value,
		});
	};

	const getAllActivities = async () => {
		console.info(
			"TODO: get all activities from strava please. show some sort of information to the user ",
		);

		setLoading(true);
		setPageNumber(0);

		try {
			const response = await fetch("/api/activities/stream/all");
			const reader = response.body?.getReader();
			if (!reader) {
				return;
			}

			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					break;
				}
				const text = decoder.decode(value);
				console.log({ text });
				const json = JSON.parse(text);

				setPageNumber(json.page);
			}
		} catch (error) {
			console.error(error);
		} finally {
			console.log("done");
			setLoading(false);
		}
	};

	const syncAllActivities = () => {
		console.info(
			"TODO: sync ALL activities from strava please. show some sort of information to the user ",
		);

		// console.log({ activities: activities.length });

		// Can re-use the above api call. And we know the total activities so can give a progress bar.
	};

	const syncLatestActivities = () => {
		console.info(
			"TODO: sync 'Latest' activities from strava please. show some sort of information to the user ",
		);
	};

	if (!user) {
		return <div>Loading</div>;
	}

	return (
		<div>
			<div className="flex gap-4 my-4">
				<Button onClick={() => setEditing((e) => !e)}>Toggle Editing</Button>

				<Button
					className="bg-red-500 p-4 rounded-sm text-white"
					onClick={getAllActivities}
					loading={loading}
					loadingText={`loading ${pageNumber} page`}
				>
					Grab All Activities from Strava
				</Button>

				<Button
					className="bg-red-500 p-4 rounded-sm text-white"
					onClick={syncLatestActivities}
					disabled
				>
					Sync Latest Activities from Strava
				</Button>

				<Button
					className="bg-red-500 p-4 rounded-sm text-white"
					onClick={syncAllActivities}
					disabled
				>
					Sync All Activities from Strava
				</Button>
			</div>

			<details>
				<summary>User Information</summary>

				<pre className="whitespace-pre-wrap break-all px-4 py-6">
					{JSON.stringify(session, null, 2)}
				</pre>
			</details>

			<ActivitiesMap />

			{editing ? (
				<>
					<h2>Editing</h2>
					<input
						value={user?.name ?? ""}
						onInput={handleInput}
						className="w-full border p-4 my-4"
					/>
				</>
			) : (
				<div>
					<div>User: {user?.name}</div>
					<div>ID: {user?.id}</div>
					<div>
						User Image:
						{user?.image && (
							<img
								src={user?.image}
								height="100"
								width="100"
								className="rounded-sm inline"
								alt="user avatar"
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
