import React from "react";
import SignIn from "../components/SignIn";
import { useSession } from "next-auth/react";
import Tasks from "@/components/Tasks";
import LoadingCard from "@/components/LoadingCard";


export const ToDoList = () => {
	const { data: session, status } = useSession();

	return (
		<>
			{status != "loading" && session ? (
				<>
					<Tasks userId={session.user?.id} status={status} />
				</>
			) : (
				""
			)}
			{status === "loading" && <LoadingCard />}
			{!session && status != "loading" ? <SignIn /> : ""}
		</>
	);
};

export default ToDoList;
