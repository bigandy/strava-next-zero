ALTER TABLE "activity" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "kudos" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "start" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "elapsedTime" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "movingTime" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "elevation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "distance" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "visibility" text NOT NULL;