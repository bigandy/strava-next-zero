import Link from "next/link";
import { useId } from "react";
import styles from "./dot.styles.module.css";

interface Props {
	name: string;
	id: string;
}

export const DotWithPopover = ({ name = "Popover Title", id }: Props) => {
	const popoverId = useId();

	return (
		<div
			className={styles.wrapper}
			style={{
				"--anchor-name": `ank-${popoverId}`,
			}}
		>
			<button
				popoverTarget={popoverId}
				className={`${styles.dot} dot`}
				type="button"
			></button>
			<div popover="auto" className={styles.popover} id={popoverId}>
				<button popoverTarget={popoverId} type="button">
					x<div className="vh">close</div>
				</button>
				<h2>{name}</h2>

				<a
					href={`https://strava.com/activities/${id}`}
					target="_blank"
					className={"underline text-blue-500 mr-4"}
				>
					See in Strava
				</a>
				<br />
				<Link
					href={`/activities/${id}`}
					className={"underline text-blue-500 mr-4"}
				>
					See in App
				</Link>
			</div>
		</div>
	);
};
