import { signIn } from "next-auth/react";
import styles from "./SignIn.module.scss";
import Link from "next/link";
//styles/s
const SignIn = () => {
	return (
		<>
			<div className={styles.container}>
				<p className={styles.message}>Not signed in</p>
				<br />
				<p className={styles.paragraph}>
					Sign in to view your tasks or start a list
				</p>
				<div className={styles.buttonContainer}>
					<Link className={styles.button} href='/login'>
						Sign in
					</Link>
				</div>
			</div>
		</>
	);
};

export default SignIn;
