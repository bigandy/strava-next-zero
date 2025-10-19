import type { Row } from "@rocicorp/zero";
import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";

import { type Schema, schema } from "./zero-schema.gen";

export { schema, type Schema };

export type User = Row<typeof schema.tables.user>;
export type Task = Row<typeof schema.tables.tasks>;
export type Todo = Row<typeof schema.tables.todos>;
export type Activity = Row<typeof schema.tables.activities>;
export type Account = Row<typeof schema.tables.account>;

// Define permissions with the inferred types from Drizzle
export const permissions = definePermissions(schema, () => ({
	tasks: ANYONE_CAN_DO_ANYTHING,
	user: ANYONE_CAN_DO_ANYTHING,
	todos: ANYONE_CAN_DO_ANYTHING,
	account: ANYONE_CAN_DO_ANYTHING,
	activities: ANYONE_CAN_DO_ANYTHING,
}));
