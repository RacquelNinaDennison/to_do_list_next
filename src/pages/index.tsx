import { getSession } from "next-auth/react";
import About from "../components/About";
import Head from "next/head";
import { NextApiRequest, NextApiResponse } from "next";
export default function Home({}) {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<About />
		</>
	);
}

export const getStaticProps = async function ({
	req,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	if (session) {
		return {
			redirect: {
				destination: "/todolist",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
