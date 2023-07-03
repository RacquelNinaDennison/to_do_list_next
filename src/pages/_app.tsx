import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../components/Navbar.css";
import Navbar from "@/components/Navbar";

function App({
	Component,
	pageProps: { session, ...pageProps },
  }){
	return (
		<>
			<SessionProvider session={session}>
				<Navbar />
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
export default App;
