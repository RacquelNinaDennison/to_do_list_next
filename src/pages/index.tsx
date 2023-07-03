import toast from "react-hot-toast";
import { useSession, getSession } from "next-auth/react";
import About from "../components/About";

export default function Home({}) {
	const { data: session, status } = useSession();

	console.log(session);
	return <About />;
}

export const getServerSideProps = async function ({ req, res }) {
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
