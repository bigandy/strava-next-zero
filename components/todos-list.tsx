"use client";

import { useQuery, useZero } from "@rocicorp/zero/react";
import { useState } from "react";

export function TodosList() {
	const z = useZero();
	const [order, setOrder] = useState<"asc" | "desc">("asc");

	const [todos] = useQuery(z.query.todos.orderBy("timestamp", order));

	return (
		<div className="border">
			<button
				onClick={() => setOrder("desc")}
				className={`border rounded p-4 ${order === "desc" ? "bg-red-600 text-white" : ""}`}
				disabled={order === "desc"}
				type="button"
			>
				Desc
			</button>
			<button
				onClick={() => setOrder("asc")}
				className={`border rounded p-4 mx-4 ${order === "asc" ? "bg-red-600 text-white" : ""}`}
				disabled={order === "asc"}
				type="button"
			>
				Asc
			</button>

			<ul className="list-disc list-inside">
				{todos.map((todo) => (
					<SingleTodo todo={todo} key={todo.id} />
				))}
			</ul>
		</div>
	);
}

const SingleTodo = ({ todo }) => {
	// const [name, setName] = useState(todo.name);

	const z = useZero();

	const toggleDone = () => {
		z.mutate.todos.update({
			id: todo.id,
			done: !todo.done,
		});
	};

	const updateInput = (e) => {
		// setName(e.target.value);

		// console.log(e.target.value, todo)
		z.mutate.todos.update({
			id: todo.id,
			name: e.target.value,
		});
	};

	const handleDeletion = () => {
		z.mutate.todos.delete({
			id: todo.id,
		});
	};

	return (
		<li className="p-4 grid grid-cols-3 gap-4 justify-stretch">
			<input
				value={todo.name}
				onInput={updateInput}
				className="border w-full p-2"
			/>

			<button
				type="button"
				className="border border-black p-2"
				onClick={toggleDone}
			>
				{todo.done ? "done" : "not done"}
			</button>

			<button
				className="border border-black rounded"
				onClick={handleDeletion}
				type="button"
			>
				Delete
			</button>
		</li>
	);
};
