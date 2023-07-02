import { signIn } from "next-auth/react";
import classes from "./SignIn.module.css";

const SignIn = () => {
	return (
		<>
			<div className={classes.container}>
				<p className={classes.message}>Not signed in</p>
				<br />
				<div className={classes.buttonContainer}>
					<button className={classes.button} onClick={() => signIn()}>
						Sign in
					</button>
				</div>
			</div>
		</>
	);
};

export default SignIn;
