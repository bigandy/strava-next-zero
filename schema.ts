import type { Row } from "@rocicorp/zero";
import { definePermissions } from "@rocicorp/zero";
import { createZeroSchema } from "drizzle-zero";
import * as drizzleSchema from "@/db/schema";

// Convert to Zero schema
export const schema = createZeroSchema(drizzleSchema, {
	version: 1,
	tables: {
		users: {
			id: true,
			name: true,
			email: false,
		},
		todos: {
			id: true,
			name: true,
			done: true,
			createdById: true,
			assignedToId: true,
			timestamp: true,
		},
		tasks: {
			id: true,
			name: true,
			status: true,
			createdById: true,
			assignedToId: true,
		},
	},
});

// Define permissions with the inferred types from Drizzle
export type Schema = typeof schema;
export type User = Row<typeof schema.tables.users>;
export type Task = Row<typeof schema.tables.tasks>;
export type Todo = Row<typeof schema.tables.todos>;

export const permissions = definePermissions(schema, () => ({}));
