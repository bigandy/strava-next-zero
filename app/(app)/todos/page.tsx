import { TodosList } from "@/components/todos-list";
import { TodoCreationForm } from "@/components/todos-form";

export default function TodosPage() {
    return (
        <>
            <h1>TODO PAGE</h1>

            <TodoCreationForm />

            <TodosList />
        </>
    );
}
