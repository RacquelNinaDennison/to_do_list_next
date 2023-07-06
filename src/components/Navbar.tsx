import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import styles from "./navbar.module.scss";

function Navbar() {
	const { data: session, status } = useSession();
	let classNameExtra = null;

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
						<Link href='/todolist'>list</Link>
					</li>
					<li>
						{status === "unauthenticated" && <Link href='/login'>Sign in</Link>}
					</li>

					<li>
						{status === "authenticated" && (
							<a
								onClick={() =>
									signOut({ callbackUrl: process.env.NEXTAUTH_URL })
								}
							>
								Sign out
							</a>
						)}
					</li>
					<li>
						{status === "authenticated" && (
							<div className={styles.userName}>
								<span>{session.user.name.toUpperCase()}</span>
							</div>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
