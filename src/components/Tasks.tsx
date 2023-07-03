import React from "react";
import styles from "./tasks.module.scss";
export const Tasks = () => {
	return (
		<div>
			<form className={styles.createNote}>
				<input
					name='title'
					placeholder={true ? "Title" : "Start Taking notes"}
					value='hello'
				/>

				<textarea name='content' placeholder='Take a note...' value='Hello' />

				<button>+</button>
			</form>
		</div>
	);
};

export default Tasks;
