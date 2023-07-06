import React from "react";
import SignIn from "../components/SignIn";
import { useSession } from "next-auth/react";
import Tasks from "@/components/Tasks";
import LoadingCard from "@/components/LoadingCard";
import Head from "next/head";


export const ToDoList = () => {
	const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>Task list</title>
			</Head>
			{status != "loading" && session ? (
				<>
					<Tasks userId={session.user?.id} status={status} />
				</>
			) : (
				""
			)}
			{status === "loading" && <LoadingCard />}
			{!session && status != "loading" ? (
				<>
					<SignIn />
				</>
			) : (
				""
			)}
		</>
	);
};

export default ToDoList;
