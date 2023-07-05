import styles from "./note.module.scss";
import React from "react";
import { Note } from "@prisma/client";
import { boolean } from "zod";

type Props = {
	notes: Note[] | null;
	delete: any;
};

export const SingleNote = (props: Props) => {
	const handleDeleteButton = (id: any) => {
		props.delete(id);
	};
	// const buttonClass = props.addedToDataBase
	// 	? styles.activeButton
	// 	: styles.inactiveButton;

	return (
		<>
			{props?.notes?.map((note) => (
				<div key={note.id} className={styles.note}>
					<h1>{note.title}</h1>
					<p>{note.content}</p>
					<button onClick={() => handleDeleteButton(note.id)} disabled={false}>
						Delete
					</button>
				</div>
			))}
		</>
	);
};

export default SingleNote;
