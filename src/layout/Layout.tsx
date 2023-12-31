import React, { ReactNode } from "react";
import styles from "../styles/layout.module.scss";

interface Props {
	children?: ReactNode;
	// any props that come into the component
}

function Layout({ children }: Props) {
	return (
		<div className='flex h-screen bg-400'>
			<div className='mx-auto my-5 bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2'>
				<div className={styles.imgStyle}>
					<div className={styles.cartoonImg}></div>
				</div>

				<div className='right flex flex-col justify-evenly bg-white-500'>
					<div className='text-center py-15'>{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Layout;
