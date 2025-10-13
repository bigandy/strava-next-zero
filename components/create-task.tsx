"use client";

import { nanoid } from "nanoid";
import { useId, useState } from "react";
import { useZero } from "@/components/zero";

export function CreateTask() {
	const id = useId();
	const z = useZero();

	const [name, setName] = useState("");

	const addTask = (e) => {
		e.preventDefault();

		if (name !== "") {
			z.mutate.tasks.insert({
				id: nanoid(),
				name,
				status: "not-started",
				createdById: z.userID,
				assignedToId: z.userID,
			});

			setName("");
		}
	};

	return (
		<div className="grid grid-cols-1 gap-2">
			<form onSubmit={addTask}>
				<label htmlFor={id}>Task:</label>

				<input
					id={id}
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border"
				/>

				<button onClick={addTask}>Create</button>
			</form>
		</div>
	);
}
