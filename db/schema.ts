import { pgTable, text } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const usersTable = pgTable("users", {
  id: text().primaryKey().$default(() => nanoid()),
  name: text().notNull(),
});

export const tasksTable = pgTable("tasks", {
  id: text().primaryKey().$default(() => nanoid()),
  name: text().notNull(),
  status: text().notNull(),
  createdById: text().notNull().references(() => usersTable.id),
  assignedToId: text().notNull().references(() => usersTable.id),
});
