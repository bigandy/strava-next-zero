import { TodoCreationForm } from "@/components/todos-form";
import { TodosList } from "@/components/todos-list";

export default function TodosPage() {
	return (
		<>
			<h1>TODO PAGE</h1>

			<TodoCreationForm />

			<TodosList />
		</>
	);
}
