import { typeToFlattenedError, z } from "zod";
import { Note } from "@prisma/client";

export type CreateNoteResponse = {
	success: boolean;
	data: Note | null;
	error: typeToFlattenedError<typeof ZodNoteCreated> | null;
};

export type DeletedNoteResponse = {
	success: boolean;
	data: Note | null;
	error: typeToFlattenedError<typeof ZodNoteCreated> | null;
};

const ZodNoteCreated = z.object({
	userId: z.string(),
	title: z.string(),
	content: z.string(),
	inDatabase: z.boolean(),
});

export type ItemCreate = {
	userId: String;
	title: String;
	content: String;
	inDatabase: Boolean;
};

export type DeleteItem = {
	noteId: string;
};
