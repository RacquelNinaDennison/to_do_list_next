import React from "react";
import styles from "./tasks.module.scss";
import axios from "axios";
import { useState } from "react";
import { SingleNote } from "./note";
import { typeToFlattenedError, z } from "zod";
import { Note } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/pages/_app";
import { toast, Toaster } from "react-hot-toast";
import LoadingCard from "./LoadingCard";

type Props = {
	userId: string;
	status: any;
};

export const Tasks = (props: Props) => {
	const [note, setNote] = useState({ title: "", content: "" });
	const [takingNote, setTakingNote] = useState(false);

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
			onMutate: (newNote) => {
				// The old data that will be updated on the UI
				queryClient.setQueryData(["getNotes"], (oldData: any) => {
					const updatedData = { ...oldData };
					updatedData.data.note.push(newNote); // add the
					return updatedData;
				});

				return { previousData: queryClient.getQueryData(["getNotes"]) };
			},
			onError: (err, variables, context: any) => {
				queryClient.setQueryData(["getNotes"], context.previousData);
			},
			onSettled: () => {
				queryClient.invalidateQueries(["getNotes"]);
				toast("Success!");
			},
		}
	);

	const deleteItemMutation = useMutation(
		(noteId) => {
			console.log(noteId);
			return axios.post(`/api/item/delete/`, { noteId: noteId });
		},
		{
			// onMutate: async (deleteNoteId) => {
			// 	// Stop the queries that may affect this operation
			// 	await queryClient.cancelQueries(["getNotes"]);

			// 	// Get a snapshot of current data
			// 	const snapshotOfPreviousTodos = queryClient.getQueryData(["getNotes"]);

			// 	// Modify cache to reflect this optimistic updat
			// 	queryClient.setQueryData(["getNotes"], (oldTodos: any) => {
			// 		// Filter out the todo with the deleteId
			// 		console.log("the old to do ", oldTodos);
			// 		const updatedTodos = oldTodos.data.note.filter(
			// 			(todo: any) => todo.id !== deleteNoteId
			// 		);
			// 		console.log("Updated to dos", updatedTodos);
			// 	});
			// 	// Return a snapshot so we can rollback in case of failure
			// 	return {
			// 		snapshotOfPreviousTodos,
			// 	};
			// },

			onSuccess: (data) => {
				queryClient.invalidateQueries(["getNotes"]);
				toast("Successfully deleted note");
			},

			onError: (err, variables, context: any) => {
				queryClient.setQueryData(["getNotes"], context.previousData);
				toast.error("Unable to delete note. Try again");
			},
			onSettled: () => {
				queryClient.invalidateQueries(["getNotes"]);
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
			toast("Fields cannot be empty");
		} else {
			createItemMutation.mutate({
				userId: props.userId,
				title: note.title,
				content: note.content,
			});
			setNote({ title: "", content: "" });
		}
	}
	const handleDeletingNote = async (noteId: void) => {
		const mutation = deleteItemMutation.mutate(noteId);
		console.log(mutation);
	};
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
					<SingleNote notes={data.data.note} delete={handleDeletingNote} />
				</>
			) : (
				<LoadingCard />
			)}
			<Toaster />
		</>
	);
};

export default Tasks;
