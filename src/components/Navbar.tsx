import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./navbar.module.scss";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Navbar() {
	const { data: session, status } = useSession();
	let classNameExtra = null;
	// console.log(session, status);
	{
		!session && status === "loading"
			? (classNameExtra = styles.loading)
			: (classNameExtra = styles.loaded);
	}
	return (
		<div className={styles.container}>
			<Toaster />
			<nav className={styles.header}>
				<h1 className={styles.logo}>
					<a className={styles.anchor} href='#'>
						To do list
					</a>
				</h1>

				<ul className={`${styles.ul} ${classNameExtra} ${styles.mainNav}`}>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/todolist'>list</Link>
					</li>
					<li>
						{status === "unauthenticated" && <Link href='/login'>Sign in</Link>}
					</li>
					<li>
						{status === "authenticated" && (
							<a
								onClick={() =>
									signOut({ callbackUrl: "http://localhost:3000" })
								}
							>
								Sign out
							</a>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
