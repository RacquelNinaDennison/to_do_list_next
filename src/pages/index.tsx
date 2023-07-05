import { getSession } from "next-auth/react";
import About from "../components/About";
import Head from "next/head";
import { NextApiRequest } from "next";
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

export const getServerSideProps = async function ({
	req,
}: {
	req: NextApiRequest;
	res: any;
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

	return {
		props: {},
	};
};
