import { CreateTask } from "@/components/create-task";
import { TaskList } from "@/components/task-list";

export default function Page() {
	return (
		<>
			<h1>Tasks</h1>

			<CreateTask />

			<TaskList />
		</>
	);
}
