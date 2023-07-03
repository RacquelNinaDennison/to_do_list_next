import React from "react";
import SignIn from "../components/SignIn";

import { useSession, signIn, signOut } from "next-auth/react";
import Tasks from "@/components/Tasks";
export const ToDoList = () => {
	const { data: session, status } = useSession();
	return (
		<>
			{status === "loading" && <h1>loading</h1>}
			{/* what would be the best to display? */}
			{!session ? <SignIn /> : <Tasks />}
		</>
	);
};

export default ToDoList;
