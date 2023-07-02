import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import About from "../components/About";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { data: session, status } = useSession();

	console.log(session, status);
	return (

			<About />

	);
}
