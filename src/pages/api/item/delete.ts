import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";
import { Note } from "@prisma/client";
import { typeToFlattenedError, z, ZodError } from "zod";

const UserRequest = z.object({
	noteId: z.string(),
});
const NoteCreated = z.object({
	userId: z.string(),
	title: z.string(),
	content: z.string(),
	inDataBase: z.boolean(),
});

export type DeletedNoteResponse = {
	success: boolean;
	note: Note | null;
	error: typeToFlattenedError<typeof NoteCreated> | null;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<DeletedNoteResponse>
) {
	console.log("THE REQUEST", req.body);
	const result = await deleteNote(req.body);
	console.log(result);
	res.status(200).json(result);
}

const deleteNote = async (rawData: any) => {
	let deletedNote;
	try {
		console.log("The user request DATA REQUEST", rawData);
		const id = UserRequest.parse(rawData);
		console.log("THE NOTE ID IS ", id.noteId);
		deletedNote = await prisma.note.delete({
			where: {
				id: id.noteId,
			},
		});
	} catch (err) {
		if (err instanceof ZodError) {
			return { success: false, note: null, error: err.flatten() };
		}
		throw err;
	}

	return { success: true, note: deletedNote, error: null };
};
