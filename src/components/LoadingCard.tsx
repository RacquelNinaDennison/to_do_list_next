import React from "react";
import styles from "./loadingCard.module.scss";
export const LoadingCard = () => {
	return (
		<div>
			<form className={styles.createNote}>
				<input name='title' placeholder='Please wait while' value='' />

				<textarea name='content' placeholder='LOADING' value='' />
			</form>
		</div>
	);
};

export default LoadingCard;
