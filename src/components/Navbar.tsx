import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
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
			<nav className={styles.header}>
				<Toaster />
				<h1 className={styles.logo}>
					<Link
						className={styles.anchor}
						href='#'
						onClick={() => {
							toast("Create a note in the list section", { icon: "📚" });
						}}
					>
						To do list
					</Link>
				</h1>

				<ul className={`${styles.ul} ${classNameExtra} ${styles.mainNav}`}>
					<li>
						<Link className='link' href='/todolist'>
							list
						</Link>
					</li>
					<li>
						{status === "unauthenticated" && <Link href='/login'>Sign in</Link>}
					</li>

					<li>
						{status === "authenticated" && (
							<a
								className='link'
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
								<span
									className='link'
									onClick={() => {
										toast("Welcome " + session.user.name, { icon: "🤗" });
									}}
								>
									{session.user.name.toUpperCase()}
								</span>
							</div>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
