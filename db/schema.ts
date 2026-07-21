import { relations, sql } from "drizzle-orm";

import {
	boolean,
	integer,
	numeric,
	pgTable,
	text,
	timestamp
} from "drizzle-orm/pg-core";

const sharedColumns = {
	createdAt: timestamp('created_at', {
		mode: 'string',
		precision: 3,
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		mode: 'string',
		precision: 3,
		withTimezone: true,
	})
		.defaultNow()
		.notNull()
		.$onUpdate(() => sql`now()`),
} as const;

const sharedUserId = {
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" })
};

export const user = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	...sharedColumns
});

export const userRelations = relations(user, ({ one }) => ({
	provider: one(account, {
		fields: [user.id],
		references: [account.userId],
	}),
}));

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),

	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	...sharedUserId,
	...sharedColumns
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	...sharedColumns
});

export const activities = pgTable("activity", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"), // Single activitity api does return this but not activities api
	kudos: integer("kudos").notNull(),
	start: timestamp("start", { withTimezone: true }).notNull(),
	elapsedTime: numeric("elapsedTime").notNull(),
	movingTime: numeric("movingTime").notNull(),
	type: text("type").notNull(),
	elevation: numeric("elevation").notNull(),
	distance: numeric("distance").notNull(),
	visibility: text("visibility").notNull(),
	summaryPolyline: text("summaryPolyline").notNull(),
	startCoords: text(),
	endCoords: text(),
	...sharedColumns
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	providerAccountId: text("provider_account_id").notNull(),
	providerId: text("provider_id").notNull(),

	access_token: text("access_token").notNull(),
	refresh_token: text("refresh_token").notNull(),
	id_token: text("id_token"),
	access_token_expires: timestamp("access_token_expires").notNull(),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	...sharedUserId,
	...sharedColumns
});

export const jwks = pgTable("jwks", {
	id: text("id").primaryKey(),
	publicKey: text("public_key").notNull(),
	privateKey: text("private_key").notNull(),
	createdAt: timestamp("created_at").notNull(),
});
