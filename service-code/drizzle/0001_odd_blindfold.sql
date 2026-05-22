ALTER TABLE "notes" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "source" varchar(255);--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "embedding" text;