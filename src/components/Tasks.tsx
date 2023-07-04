import React from "react";
import styles from "./tasks.module.scss";
import axios from "axios";
import { useState } from "react";
import { SingleNote } from "./note";
import { typeToFlattenedError, z } from "zod";
import { Note } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/pages/_app";
import LoadingCard from "./LoadingCard";

type Props = {
	userId: string;
	status: any;
};

export const Tasks = (props: Props) => {
	const [note, setNote] = useState({ title: "", content: "" });
	const [takingNote, setTakingNote] = useState(false);
	const [emptyField, setEmptyField] = useState(false);
	const [loading, setIsLoading] = useState(false);

	type CreateNoteResponse = {
		sucess: boolean;
		data: Note | null;
		error: typeToFlattenedError<typeof ZodNoteCreated> | null;
	};

	const ZodNoteCreated = z.object({
		userId: z.string(),
		title: z.string(),
		content: z.string(),
	});

	type ItemCreate = {
		userId: String;
		title: string;
		content: string;
	};

	const createItemMutation = useMutation<
		CreateNoteResponse,
		CreateNoteResponse,
		ItemCreate
	>(
		(data) => {
			return axios.post("/api/item/create", data);
		},
		{
			onMutate: () => {
				setIsLoading(true);
			},
			onSuccess: () => {
				queryClient.invalidateQueries(["getNotes"]);
				console.log("Success");
			},
			onError: (err) => {
				console.log(err);
				console.error("Something went wrong :(");
			},
			onSettled: () => {
				setIsLoading(false);
			},
		}
	);
	const { isLoading, error, data, isSuccess } = useQuery(
		["getNotes"],
		async (): Promise<any> => {
			return await axios.post("/api/item/get", { userId: props.userId });
		}
	);

	function handleButtonSubmission(event: any) {
		event.preventDefault();
		if (note.title.trim() == "" || note.content.trim() == "") {
			setEmptyField(true);
		}
		createItemMutation.mutate({
			userId: props.userId,
			title: note.title,
			content: note.content,
		});
		setNote({ title: "", content: "" });
	}

	function handleNoteMaking(event: any) {
		const { name, value } = event.target;
		setNote((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}
	if (isSuccess) {
		console.log(data.data.note);
	}

	return (
		<>
			{isSuccess && props.status != "loading" ? (
				<>
					<div className={styles.container}>
						<form className={styles.createNote}>
							<input
								name='title'
								placeholder={true ? "Title" : "Start Taking notes"}
								value={note.title}
								onChange={handleNoteMaking}
								onClick={() => {
									setTakingNote(true);
								}}
							/>

							<textarea
								name='content'
								placeholder='Take a note...'
								value={note.content}
								onChange={handleNoteMaking}
							/>

							<button onClick={handleButtonSubmission}>+</button>
						</form>
					</div>
					<SingleNote notes={data.data.note} />
				</>
			) : (
				<LoadingCard />
			)}
		</>
	);
};

export default Tasks;
