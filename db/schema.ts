import type { AdapterAccountType } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" })
			.primaryKey(),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId],
			}),
		},
	],
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken"),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => [
		{
			compositePk: primaryKey({
				columns: [verificationToken.identifier, verificationToken.token],
			}),
		},
	],
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique().primaryKey(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => [
		{
			compositePK: primaryKey({
				columns: [authenticator.userId, authenticator.credentialID],
			}),
		},
	],
);

export const tasks = pgTable("tasks", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	status: text("status").notNull(),
	createdById: text()
		.notNull()
		.references(() => users.id),
	assignedToId: text()
		.notNull()
		.references(() => users.id),
});

export const todos = pgTable("todos", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	done: boolean().notNull(),
	createdById: text()
		.notNull()
		.references(() => users.id),
	assignedToId: text()
		.notNull()
		.references(() => users.id),
	timestamp: text("timestamp").notNull().default(sql`(current_timestamp)`),
});

export const userRelations = relations(users, ({ one }) => ({
	provider: one(accounts, {
		fields: [users.id],
		references: [accounts.userId],
	}),
}));

export const todosRelations = relations(todos, ({ one }) => ({
	createdBy: one(users, {
		fields: [todos.createdById],
		references: [users.id],
	}),
	assignedTo: one(users, {
		fields: [todos.assignedToId],
		references: [users.id],
	}),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
	createdBy: one(users, {
		fields: [tasks.createdById],
		references: [users.id],
	}),
	assignedTo: one(users, {
		fields: [tasks.assignedToId],
		references: [users.id],
	}),
}));
