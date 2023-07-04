import styles from "./note.module.scss";
import React from "react";
import { Note } from "@prisma/client";

type Props = {
	notes: Note[] | null;
	delete: any;
};

export const SingleNote = (props: Props) => {
	const handleDeleteButton = (id: any) => {
		props.delete(id);
	};
	return (
		<>
			{props?.notes?.map((note) => (
				<div key={note.id} className={styles.note}>
					<h1>{note.title}</h1>
					<p>{note.content}</p>
					<button onClick={() => handleDeleteButton(note.id)}>Delete</button>
				</div>
			))}
		</>
	);
};

export default SingleNote;
