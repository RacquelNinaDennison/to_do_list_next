import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
	const { data: session, status } = useSession();

	// console.log(session, status);
	return (
		<div className='container'>
			<nav className='header'>
				<h1 className='logo'>
					<a href='#'>To do list</a>
				</h1>
				<ul
					className={`main-nav ${
						!session && status === "loading" ? "loading" : "loaded"
					}`}
				>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/dashboard'>Dashboard</Link>
					</li>
					<li>
						<Link href='/todolist'>list</Link>
					</li>
					<li>
						{status === "unauthenticated" && (
							<a onClick={() => signIn()}>Sign in</a>
						)}
					</li>
					<li>
						{status === "authenticated" && (
							<a onClick={() => signOut()}>Sign out</a>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
