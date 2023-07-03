import exp from "constants";
import React from "react";
import classes from "./about.module.scss";
import Link from "next/link";
export const About = () => {
	return (
		<div>
			<div className={classes.container}>
				<h1 className={classes.heading}>Get Organised Today!</h1>
				<div className={classes.content}>
					<p>
						Welcome to the funky and efficient to-do app that will help you stay
						organized and productive. Say goodbye to the chaos of forgotten
						tasks and hello organisation!!!!
					</p>

					<div className={classes.linkContainer}>
						<Link className={classes.link} href='./todolist'>
							Go to tasks
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
