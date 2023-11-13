DROP INDEX IF EXISTS `nameIdx`;--> statement-breakpoint
DROP INDEX IF EXISTS `usernameIdx`;--> statement-breakpoint
CREATE UNIQUE INDEX `part_name_idx` ON `parts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_idx` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_part_name_idx` ON `vehicle_parts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_name_idx` ON `vehicles` (`name`);