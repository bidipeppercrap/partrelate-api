CREATE TABLE `parts_to_vehicle_parts` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text,
	`quantity` text,
	`vehicle_part_id` integer NOT NULL,
	`part_id` integer NOT NULL,
	FOREIGN KEY (`vehicle_part_id`) REFERENCES `vehicle_parts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`part_id`) REFERENCES `parts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`note` text
);
--> statement-breakpoint
CREATE TABLE `vehicle_parts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`note` text,
	`vehicle_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`note` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`key` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `part_name_idx` ON `parts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_part_name_idx` ON `vehicle_parts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_name_idx` ON `vehicles` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_idx` ON `users` (`username`);