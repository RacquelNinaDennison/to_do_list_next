import React, { useEffect, useState } from "react";
import SignIn from "../components/SignIn";
import axios from "axios";
import styles from "../styles/todolist.module.scss";

import { useSession, signIn, signOut } from "next-auth/react";
import Tasks from "@/components/Tasks";
import LoadingCard from "@/components/LoadingCard";

let user;

type GetUserResponse = {
	name: String;
};

const fetchUser = async (): Promise<GetUserResponse> => {
	return (await axios.post("/api/hello")).data;
};

export const ToDoList = () => {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<GetUserResponse | null>(null);
	// const user = await fetchUser();
	// console.log(user);

	console.log(session?.user?.name);
	useEffect(() => {
		const getUserData = async () => {
			const userData = await fetchUser();
			setUser(userData);
		};

		getUserData();
	}, []);
	return (
		<>
			{status != "loading" && session ? (
				<>
					<h2 className={styles.welcome}>Welcome {session?.user?.name}!</h2>
					<Tasks />
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
