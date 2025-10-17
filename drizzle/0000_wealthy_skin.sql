CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "activity" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"kudos" integer,
	"start" timestamp with time zone,
	"elapsedTime" numeric,
	"movingTime" numeric,
	"type" text,
	"elevation" numeric,
	"distance" numeric,
	"isPrivate" boolean
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"createdById" text NOT NULL,
	"assignedToId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"done" boolean NOT NULL,
	"createdById" text NOT NULL,
	"assignedToId" text NOT NULL,
	"timestamp" text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_createdById_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedToId_user_id_fk" FOREIGN KEY ("assignedToId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_createdById_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_assignedToId_user_id_fk" FOREIGN KEY ("assignedToId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;