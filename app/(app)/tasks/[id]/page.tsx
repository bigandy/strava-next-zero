import { EditTask } from "@/components/edit-task";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<>
			<h1>Task: {id}</h1>
			<EditTask taskId={id} />
		</>
	);
}
