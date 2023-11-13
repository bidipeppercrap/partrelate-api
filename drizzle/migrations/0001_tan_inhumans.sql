CREATE TABLE `vehicles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `vehicles` (`name`);