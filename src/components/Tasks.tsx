import React from "react";
import styles from "./tasks.module.scss";
import { useState } from "react";
import { SingleNote } from "./note";

export const Tasks = () => {
	const [note, setNote] = useState({ title: "", content: "" });
	const [takingNote, setTakingNote] = useState(false);
	const [emptyField, setEmptyField] = useState(false);

	function handleButtonSubmission(event: any) {
		event.preventDefault();
		if (note.title.trim() == "" || note.content.trim() == "") {
			setEmptyField(true);
		}
		console.log(note);
		setNote({ title: "", content: "" });
	}

	// const handleDelete = (id) => {
	// 	deleteMutation.mutateAsync(id);
	// };

	function handleNoteMaking(event: any) {
		const { name, value } = event.target;
		setNote((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	return (
		<>
			<div>
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
			<SingleNote />
		</>
	);
};

export default Tasks;
