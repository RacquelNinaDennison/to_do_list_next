// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";
import { Note } from "@prisma/client";

import { typeToFlattenedError, z, ZodError } from "zod";

type NotesCreatedResponse = {
	success: boolean;
	note: Note[] | null;
	error: typeToFlattenedError<typeof NoteCreated> | null;
};
const UserRequest = z.object({
	userId: z.string(),
});
const NoteCreated = z.object({
	userId: z.string(),
	title: z.string(),
	content: z.string(),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NotesCreatedResponse>
) {
	const result = await getNote(req.body);
	res.status(200).json(result);
}

const getNote = async (rawData: any): Promise<NotesCreatedResponse> => {
	let notes: Note[] | null;
	try {
		const id = UserRequest.parse(rawData);
		console.log("The user id is " + id.userId);
		notes = await prisma.note.findMany({
			where: {
				userId: id.userId,
			},
		});
	} catch (err) {
		if (err instanceof ZodError) {
			return { success: false, note: null, error: err.flatten() };
		}
		throw err;
	}

	return { success: true, note: notes, error: null };
};
