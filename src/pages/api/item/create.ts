import { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError, z, ZodError } from "zod";

import { prisma } from "@/server/db/client";

const NoteCreated = z.object({
	userId: z.string(),
	title: z.string(),
	content: z.string(),
	inDatabase: z.boolean(),
});

type CreateItemResponse = {
	success: boolean;
	data: Note | null;
	errors: typeToFlattenedError<typeof NoteCreated> | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const result = await createNote(req.body);
	res.status(200).json(result);
};

const createNote = async (requestData: any): Promise<CreateItemResponse> => {
	let note: Note | null;
	try {
		const data = NoteCreated.parse(requestData);
		note = await prisma.note.create({
			data: {
				userId: data.userId,
				title: data.title,
				content: data.content,
				inDatabase: true,
			},
		});
	} catch (err) {
		if (err instanceof ZodError) {
			return { success: false, data: null, errors: err.flatten() };
		}
		throw err;
	}
	return { success: true, data: note, errors: null };
};

export default handler;
