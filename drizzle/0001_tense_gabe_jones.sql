ALTER TABLE "users" ADD COLUMN "email" text NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pass_hash" text NOT NULL DEFAULT '';

UPDATE "users"
SET
    email = 'alice@example.com',
    pass_hash = '$2b$10$A.g71FEFfNJygRE5kcq7eeHvYrI0xfAIdasM5L2jibBcNONRT1FsW'
WHERE id = 'u001';

UPDATE "users"
SET
    email = 'bob@example.com',
    pass_hash = '$2b$10$IfokC3j3meKpaLMU7MqF1OZpzyZM/LGI0OqCOQsfbRAJe8q8JYMNG'
WHERE id = 'u002';
