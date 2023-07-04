// import { User } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";
// import { z, ZodError } from "zod";

// import { useSession } from "next-auth/react";

// type GetUserResponse = {
// 	success: boolean;
// 	data: User | null;
// 	errors: unknown;
// };



// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// 	// if (!session) {
// 	// 	return res
// 	// 		.status(401)
// 	// 		.json({ success: false, data: null, errors: "Unauthorized" });
// 	// }

// 	const data = await getUser(req.body);

// 	return res.status(200).json(data);
// };

// const getItems = async (rawData: unknown): Promise<GetUserResponse> => {
// 	let items: Item[];

// 	try {
// 		const data = ItemsGet.parse(rawData);
// 		items = await prisma.item.findMany({
// 			where: { listId: data.listId },
// 		});
// 	} catch (err) {
// 		if (err instanceof ZodError) {
// 			return { success: false, data: null, errors: err.flatten() };
// 		}

// 		throw err;
// 	}

// 	return { success: true, data: items, errors: null };
// };

// export default handler;
