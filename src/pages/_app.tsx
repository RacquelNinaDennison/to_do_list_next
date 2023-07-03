import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import "../components/Navbar.css";
import Navbar from "@/components/Navbar";

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Navbar />
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default App;
