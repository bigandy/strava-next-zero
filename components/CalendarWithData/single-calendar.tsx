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
	month: number;
	year: number;
	data?: Array<DotData>;
}

import styles from "./styles.module.css";

export const SingleCalendar = ({
	month,
	year,
	data,
}: CalendarWithDataProps) => {
	return (
		<div className={styles.wrapper}>
			<div
			// classList={{
			// 	[styles.calendar]: true,
			// 	[styles.currentCalendar]: offset() === 0,
			// }}
			>
				<Header month={month} year={year} />

				<table>
					<TableHeader />
					<tbody>
						<Rows month={month} year={year} data={data} />
					</tbody>
				</table>
			</div>
		</div>
	);
};
