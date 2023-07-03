import React from "react";
import Layout from "../layout/Layout";
import classes from "../styles/form.module.css";
import Link from "next/link";

export const login = () => {
	return (
		<div>
			<Layout>
				<section className='w-3/4 mx-auto flex flex-col gap-10'>
					<div className='title'>
						<h1 className='text-gray-800 text-4xl font-bold py-4'>Welcome</h1>
						<p className='w-3/4 mx-auto text-gray-400'>
							Log in with credentials or with other providers.
						</p>
					</div>

					<form className='flex flex-col gap-5'>
						<div className='input-group'>
							<input type='email' name='email' placeholder='Email' />
						</div>
						<div className='input-group'>
							<input type='password' name='password' placeholder='password' />
						</div>

						<div className='input-button'>
							<button type='submit' className={classes.button}>
								Login
							</button>
						</div>
						<div className='input-button'>
							<button type='submit'>Sign In with Google</button>
						</div>
						<div className='input-button'>
							<button type='submit'>Sign In with Github</button>
						</div>
					</form>

					<p className='text-center text-gray-400 '>
						Register account{"   "}
						<Link className='text-black-700' href={"/register"}>
							Sign up
						</Link>
					</p>
				</section>
			</Layout>
		</div>
	);
};

export default login;
