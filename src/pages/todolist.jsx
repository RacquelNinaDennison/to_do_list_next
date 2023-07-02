import React from "react";
import SignIn from "../components/SignIn";
import { useSession, signIn, signOut } from "next-auth/react";
export const ToDoList = () => {
	const { data: session } = useSession();
	return <>{!session ? <SignIn /> : <h1>Tasks</h1>}</>;
};

export default ToDoList;
