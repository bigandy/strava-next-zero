'use client';

import { nanoid } from "nanoid";
import { useZero } from "@/components/zero";
import { useState, useId } from "react";

export function TodoCreationForm() {
    const z = useZero();
    const [name, setName] = useState("");

    const id = useId();


    const createNewTodo = (e) => {
        e.preventDefault();

        if (name !== '') {
            z.mutate.todos.insert({
                id: nanoid(),
                name,
                done: false,
                createdById: z.userID,
                assignedToId: z.userID,
            });

            setName('');
        }
    }

    return (
        <form className="grid grid-cols-1 gap-2" onSubmit={createNewTodo}>
            <label htmlFor={id}>Task:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="border" id={id} />
            <button onClick={createNewTodo} className="border bg-red-400 text-white p-4">
                Create New Task
            </button>
        </form>
    );
}