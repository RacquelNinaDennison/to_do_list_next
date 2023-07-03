import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Toaster />
			<Navbar />
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default App;
