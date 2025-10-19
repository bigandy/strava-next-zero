"use client";
import { useQuery } from "@rocicorp/zero/react";
import { useState } from "react";
import { useZero } from "@/components/zero";

export const User = ({ id }: { id: string }) => {
	const [editing, setEditing] = useState(false);
	const z = useZero();

	const [user] = useQuery(
		z.query.user.related("provider").where("id", "=", id).one(),
	);

	const handleInput = (e) => {
		const { value } = e.target;

		z.mutate.user.update({
			id: user.id,
			name: value,
		});
	};

	return (
		<div>
			<button
				type="button"
				className="bg-red-500 p-4 rounded-sm text-white"
				onClick={() => setEditing((e) => !e)}
			>
				Toggle Editing
			</button>
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
					<div>User Email: {user?.email}</div>
					<div>ID: {user?.id}</div>
					<div>
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
					</div>
					<div>Provider: {user?.provider?.provider}</div>
				</div>
			)}
		</div>
	);
};
