'use client';

import { useZero } from "@/components/zero";
import { useQuery } from "@rocicorp/zero/react";
import { useState } from "react";

export function TodosList() {
    const z = useZero();
    const [order, setOrder] = useState('asc');

    const [todos] = useQuery(z.query.todos.orderBy('timestamp', order));

    return (
        <div className="border">
            <button onClick={() => setOrder('desc')} className="border rounded p-4 ">Desc</button>
            <button onClick={() => setOrder('asc')} className="border rounded p-4 mx-4">Asc</button>

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
        <li className="p-4">
            <input value={todo.name} onInput={updateInput} className="border w-full my-4 p-2" />

            <div className="border p-3" onClick={toggleDone}>{todo.done ? "done" : "not done"}</div>

            <button onClick={handleDeletion}>Delete</button>
        </li>
    )
}