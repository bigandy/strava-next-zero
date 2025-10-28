"use client";
import { useQuery } from "@rocicorp/zero/react";
import { useState } from "react";
import { Button } from "@/components/button";
import { useZero } from "@/components/zero";

export const User = ({ id }: { id: string }) => {
	const [editing, setEditing] = useState(false);
	const z = useZero();

	const [user] = useQuery(
		z.query.user.related("provider").where("id", "=", id).one(),
	);

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

	const getAllActivities = () => {
		console.info(
			"TODO: get all activities from strava please. show some sort of information to the user ",
		);
	};

	const syncLatestActivities = () => {
		console.info(
			"TODO: sync activities from strava please. show some sort of information to the user ",
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
			</div>
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
					{/* <div>User Email: {user?.email}</div> */}
					<div>ID: {user?.id}</div>
					{/* <div>
						User Image:
						{user?.image && (
							<img
								src={user?.image}
								height="50"
								width="50"
								className="rounded-sm inline"
								alt="user avatar"
							/>
						)}
					</div> */}
					<div>Provider: {user?.provider?.providerId}</div>
				</div>
			)}
		</div>
	);
};
