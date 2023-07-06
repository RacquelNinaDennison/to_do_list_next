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
import {
	CreateNoteResponse,
	ItemCreate,
	DeletedNoteResponse,
	DeleteItem,
} from "../../types/ResponseTypes/response.types";

type Props = {
	userId: string;
	status: any;
};

export const Tasks = (props: Props) => {
	const [note, setNote] = useState({ title: "", content: "" });

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
					toast("Successfully made note!", { icon: "👻" });
					return updatedData;
				});

				return { previousData: queryClient.getQueryData(["getNotes"]) };
			},
			onError: (err, variables, context: any) => {
				queryClient.setQueryData(["getNotes"], context.previousData);

				toast("Error occured making note. Please try again");
			},
			onSettled: () => {
				queryClient.invalidateQueries(["getNotes"]);
			},
		}
	);

	const deleteItemMutation = useMutation<
		DeletedNoteResponse,
		DeletedNoteResponse,
		DeleteItem
	>(
		(data) => {
			return axios.post("/api/item/delete", data);
		},
		{
			onMutate: async (deleteNoteId) => {
				// Stop the queries that may affect this operation
				await queryClient.cancelQueries(["getNotes"]);

				// Get a snapshot of current data
				const previousData = queryClient.getQueryData(["getNotes"]);

				// Modify cache to reflect this optimistic updat
				queryClient.setQueryData(["getNotes"], (oldTodos: any) => {
					// Filter out the todo with the deleteId
					let updatedTodos = { ...oldTodos };
					updatedTodos.data.note = oldTodos.data.note.filter(
						(todo: any) => todo.id !== deleteNoteId.noteId
					);
					return updatedTodos;
				});
				toast.success("Deleted note successfully ! :) ");
				// Return a snapshot so we can rollback in case of failure
				return {
					previousData,
				};
			},

			onSuccess: (data) => {
				queryClient.invalidateQueries(["getNotes"]);
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
			toast("Fields cannot be empty", { icon: "🥲" });
		} else {
			createItemMutation.mutate({
				userId: props.userId,
				title: note.title,
				content: note.content,
				inDatabase: false,
			});

			setNote({ title: "", content: "" });
		}
	}

	const handleDeletingNote = async (noteId: any) => {
		deleteItemMutation.mutate({
			noteId: noteId,
		});
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
								type='text'
								name='title'
								placeholder={"Title"}
								value={note.title}
								onChange={handleNoteMaking}
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
					{data.data.note.map((note: Note) => {
						return (
							<SingleNote
								key={note.id}
								note={note}
								delete={handleDeletingNote}
							/>
						);
					})}
				</>
			) : (
				<LoadingCard />
			)}
			<Toaster
				toastOptions={{
					// Define default options
					className: "",
					duration: 2000,
					style: {
						background: "#F8F6F4",
						color: "#212A3E",
					},
				}}
			/>
		</>
	);
};

export default Tasks;
