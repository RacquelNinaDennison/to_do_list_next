import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<Navbar />
				<Component {...pageProps} />
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default App;
