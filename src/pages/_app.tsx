import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../components/Navbar.css";
import Navbar from "@/components/Navbar";

function App({ Component, pageProps }) {
	return (
		<>
			<SessionProvider>
				<Navbar />
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
export default App;
