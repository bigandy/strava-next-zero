'use client';

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";
import { useState } from 'react'

export function TodosList() {
    const z = useZero();
    const [todos] = useQuery(z.query.todos);

    return (
        <div className="border">
            <ul className="list-disc list-inside">
                {todos.map(todo => (
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
        })
    }

    const updateInput = (e) => {
        // setName(e.target.value);

        // console.log(e.target.value, todo)
        z.mutate.todos.update({
            id: todo.id,
            name: e.target.value
        })
    }

    const handleDeletion = () => {
        z.mutate.todos.delete({
            id: todo.id
        })
    }


    return (
        <li>
            <input value={todo.name} onInput={updateInput} className="border" />

            <div className="border p-3" onClick={toggleDone}>{todo.done ? "done" : "not done"}</div>

            <button onClick={handleDeletion}>Delete</button>
        </li>
    )
}