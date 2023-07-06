// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";

declare global {
	
	var prisma: PrismaClient | undefined;
}
// defining a prisma client with the log statements
export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ["query", "error", "warn"],
	});
