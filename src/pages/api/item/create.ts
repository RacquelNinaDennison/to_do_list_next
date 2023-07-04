import { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeToFlattenedError, z, ZodError } from "zod";

import { prisma } from "@/server/db/client";

const NoteCreated = z.object({
	noteId: z.number(),
	title: z.string(),
	content: z.string(),
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
