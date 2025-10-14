import type { Row } from "@rocicorp/zero";
import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";

// import { drizzleZeroConfig } from "drizzle-zero";
// import * as drizzleSchema from "@/db/schema";

import { type Schema, schema } from "./zero-schema.gen";

export { schema, type Schema };

// Define permissions with the inferred types from Drizzle
// export type Schema = typeof schema;
export type User = Row<typeof schema.tables.users>;
export type Task = Row<typeof schema.tables.tasks>;
export type Todo = Row<typeof schema.tables.todos>;

export const permissions = definePermissions(schema, () => ({
	tasks: ANYONE_CAN_DO_ANYTHING,
	users: ANYONE_CAN_DO_ANYTHING,
	todos: ANYONE_CAN_DO_ANYTHING,
}));
