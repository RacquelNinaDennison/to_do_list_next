import styles from "./note.module.scss";

import React from "react";

export const SingleNote = () => {
	return (
		<div className={styles.noteContainer}>
			<h1 className={styles.heading}>Note</h1>
			<p className={styles.content}>Content</p>
			<button className={styles.buttonStyle}>Delete</button>
		</div>
	);
};
