import type { AdapterAccountType } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import {
	boolean,
	integer,
	numeric,
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

export const activities = pgTable("activity", {
	id: text("id").primaryKey(),
	name: text("name"),
	description: text("description"),
	duration: text("duration"),
	kudos: integer("kudos"),
	start: text("start"),
	elapsedTime: numeric("elapsedTime"),
	movingTime: numeric("movingTime"),
	type: text("type"),
	elevation: numeric("elevation"),
	distance: numeric("distance"),
	//   athlete: {
	// 	resource_state: number;
	// 	firstname: string;
	// 	lastname: string;
	//   },
	//   distance?: number;
	//   moving_time?: number;
	//   elapsed_time?: number;
	//   total_elevation_gain?: number;
	//   elev_high?: number;
	//   elev_low?: number;
	//   sport_type: SportType;
	//   start_date: Date;
	//   start_date_local: Date;
	//   timezone?: string;
	//   utc_offset?: number;
	//   location_city?: string;
	//   location_state?: string;
	//   location_country?: string;
	//   achievement_count?: number;
	//   kudos_count?: number;
	//   comment_count?: number;
	//   athlete_count?: number;
	//   photo_count?: number;
	//   total_photo_count?: number;
	//   map?: PolylineMapResponse;
	//   trainer?: boolean;
	//   commute?: boolean;
	//   manual?: boolean;
	//   private?: boolean;
	//   flagged?: boolean;
	//   average_speed?: number;
	//   max_speed?: number;
	//   has_kudoed?: boolean;
	//   hide_from_home?: boolean;
	//   gear_id?: string;
	//   description?: string;
	//   calories?: number;
	//   start_latlng?: Array<number>;
	//   end_latlng?: Array<number>;
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
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
	(account) => ({
		compositePk: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
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
