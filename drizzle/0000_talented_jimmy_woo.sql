CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"createdById" text NOT NULL,
	"assignedToId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_createdById_users_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedToId_users_id_fk" FOREIGN KEY ("assignedToId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;


-- Seeding with Sample Data

INSERT INTO "users" (id, name) VALUES ('u001', 'Alice');
INSERT INTO "users" (id, name) VALUES ('u002', 'Bob');

INSERT INTO "tasks" (id, name, status, "createdById", "assignedToId") VALUES
  ('t001', 'Get milk', 'done', 'u001', 'u001');
INSERT INTO "tasks" (id, name, status, "createdById", "assignedToId") VALUES
  ('t002', 'Get cookies', 'in-progress', 'u001', 'u001');
INSERT INTO "tasks" (id, name, status, "createdById", "assignedToId") VALUES
  ('t003', 'Walk the dog', 'in-progress', 'u002', 'u002');
INSERT INTO "tasks" (id, name, status, "createdById", "assignedToId") VALUES
  ('t004', 'Buy movie tickets', 'not-started', 'u002', 'u001');
