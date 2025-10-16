import { useState } from "react";

export interface DotData {
	date: string;
	information?: {
		title?: string;
		content?: string;
		link?: string;
	};
}
interface CalendarWithDataProps {
	data?: Array<DotData>;
}

import styles from "./styles.module.css";

export const MultipleCalendars = ({ data }: CalendarWithDataProps) => {
	const [year, setYear] = useState(new Date().getFullYear());

	// TODO GET MONTHS FOR CURRENT YEAR

	// SHOW YEAR SELECTOR

	// UPDATE MONTHS WHEN YEAR CHANGES

	return (
		<div>
			<h2>{year}</h2>
			<div
			// classList={{
			// 	[styles.calendar]: true,
			// 	[styles.currentCalendar]: offset() === 0,
			// }}
			>
				{/* <Header offset={offset} setOffset={setOffset} />

				<table>
					<TableHeader />
					<tbody>
						<Rows offset={offset} data={data} />
					</tbody>
				</table> */}
			</div>
		</div>
	);
};
