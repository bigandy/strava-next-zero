import { useState } from "react";

import { Header } from "./calendar-header";
import { Rows } from "./row";
import { TableHeader } from "./table-header";

export interface DotData {
	date: string;
	information?: {
		title?: string;
		content?: string;
		link?: string;
	};
}
interface CalendarWithDataProps {
	initialOffset?: number;
	data?: Array<DotData>;
}

import styles from "./styles.module.css";

export const SingleCalendar = ({
	initialOffset = 0,
	data,
}: CalendarWithDataProps) => {
	const [offset, setOffset] = useState(initialOffset);

	return (
		<div className={styles.wrapper}>
			<div
			// classList={{
			// 	[styles.calendar]: true,
			// 	[styles.currentCalendar]: offset() === 0,
			// }}
			>
				<Header offset={offset} setOffset={setOffset} />

				<table>
					<TableHeader />
					<tbody>
						<Rows offset={offset} data={data} />
					</tbody>
				</table>
			</div>
		</div>
	);
};
