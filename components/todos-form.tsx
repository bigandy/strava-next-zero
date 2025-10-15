"use client";

import { nanoid } from "nanoid";
import { useId, useState } from "react";
import { useZero } from "@/components/zero";

export function TodoCreationForm() {
	const z = useZero();
	const [name, setName] = useState("");

	const id = useId();

	const createNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (name !== "") {
			z.mutate.todos.insert({
				id: nanoid(),
				name,
				done: false,
				createdById: z.userID,
				assignedToId: z.userID,
			});

			setName("");
		}
	};

	return (
		<form className="grid grid-cols-1 gap-2" onSubmit={createNewTodo}>
			<label htmlFor={id}>Task:</label>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border p-4"
				id={id}
			/>
			<button
				className="border bg-red-400 text-white p-4"
				type="button"
			>
				Create New Todo
			</button>
		</form>
	);
}
