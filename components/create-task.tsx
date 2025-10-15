"use client";

import { nanoid } from "nanoid";
import { useId, useState } from "react";
import { useZero } from "@/components/zero";

export function CreateTask() {
	const id = useId();
	const z = useZero();

	const [name, setName] = useState("");

	const addTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

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
		<div className="grid gap-2">
			<form onSubmit={addTask}>
				<label htmlFor={id} className="block cursor-pointer">Task:</label>

				<input
					id={id}
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border p-4 my-2"
				/>

				<button className="border bg-red-400 text-white p-4 w-full"
				type="button">Create</button>
			</form>
		</div>
	);
}
