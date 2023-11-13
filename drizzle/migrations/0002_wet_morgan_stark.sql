CREATE TABLE `part_to_vehicle_part` (
	`vehicle_part_id` integer,
	`part_id` integer,
	PRIMARY KEY(`part_id`, `vehicle_part_id`)
);
--> statement-breakpoint
CREATE TABLE `parts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `vehicle_parts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`vehicle_id` integer,
	FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `parts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `vehicle_parts` (`name`);