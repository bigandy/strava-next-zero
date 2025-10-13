"use client";

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";

export function EditTask({ taskId }: { taskId: string }) {
	const z = useZero();
	const [task] = useQuery(
		z.query.tasks
			.related("assignedTo")
			.related("createdBy")
			.where("id", "=", taskId)
			.one(),
	);
	const [users] = useQuery(z.query.users);
	return (
		<div className="grid grid-cols-1 gap-4 max-w-sm">
			<div className="flex gap-2">
				<label>Name:</label>
				<input
					className="border"
					value={task?.name || ""}
					onChange={(e) =>
						z.mutate.tasks.update({
							id: taskId,
							name: e.target.value,
						})
					}
				/>
			</div>
			<div className="flex gap-2">
				<label>Status:</label>
				<select
					value={task?.status || "not-started"}
					onChange={(e) =>
						z.mutate.tasks.update({
							id: taskId,
							status: e.target.value,
						})
					}
				>
					{STATUSES.map((s) => (
						<option key={s.key} value={s.key}>
							{s.value}
						</option>
					))}
				</select>
			</div>

			<div className="flex gap-2">
				<label>Created By:</label>
				<select
					value={task?.createdById || z.userID}
					onChange={(e) =>
						z.mutate.tasks.update({
							id: taskId,
							createdById: e.target.value,
						})
					}
				>
					{users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.name}
						</option>
					))}
				</select>
			</div>

			<div className="flex gap-2">
				<label>Assigned To:</label>
				<select
					value={task?.assignedToId || z.userID}
					onChange={(e) =>
						z.mutate.tasks.update({
							id: taskId,
							assignedToId: e.target.value,
						})
					}
				>
					{users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

const STATUSES = [
	{
		key: "not-started",
		value: "Not Started",
	},
	{
		key: "in-progress",
		value: "In Progress",
	},
	{
		key: "done",
		value: "Done",
	},
];
