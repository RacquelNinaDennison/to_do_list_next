import styles from "./note.module.scss";
import React from "react";
import { Note } from "@prisma/client";

type Props = {
	notes: Note[] | null;
};

export const SingleNote = (props: Props) => {
	return (
		<>
			{props?.notes?.map((note) => (
				<div key={note.id} className={styles.note}>
					<h1>{note.title}</h1>
					<p>{note.content}</p>
					<button>Delete</button>
				</div>
			))}
		</>
	);
};

export default SingleNote;
