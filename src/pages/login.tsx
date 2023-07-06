import React from "react";
import Layout from "../layout/Layout";
import styles from "../styles/form.module.scss";
import Image from "next/image";
import Head from "next/head";
import { signIn } from "next-auth/react";

export const login = () => {
	const handleGoogleSignin = () => {
		signIn("google", { callbackUrl: process.env.NEXTAUTH_URL + "/todolist" });
	};

	const handleGithubSignin = () => {
		signIn("github", { callbackUrl: process.env.NEXTAUTH_URL + "/todolist" });
	};
	return (
		<div>
			<Layout>
				<Head>
					<title>Login</title>
				</Head>
				<section className='w-3/4 mx-auto flex flex-col gap-10'>
					<div className='title'>
						<h1 className='text-gray-800 text-4xl font-bold py-4'>Welcome</h1>
						<p className='w-3/4 mx-auto text-gray-400'>
							Log in with either provider.
						</p>
					</div>

					<form className='flex flex-col gap-5'>
						<div className='input-button'>
							<button
								type='button'
								onClick={handleGoogleSignin}
								className={styles.button_custom}
							>
								Sign In with Google{" "}
								<Image
									src={"/google.svg"}
									width='20'
									height={20}
									alt='google'
								></Image>
							</button>
						</div>
						<div className='input-button'>
							<button
								type='button'
								className={styles.button_custom}
								onClick={handleGithubSignin}
							>
								Sign In with Github{" "}
								<Image
									src={"/github.svg"}
									width={25}
									height={25}
									alt='github'
								></Image>
							</button>
						</div>
					</form>
				</section>
			</Layout>
		</div>
	);
};

export default login;
