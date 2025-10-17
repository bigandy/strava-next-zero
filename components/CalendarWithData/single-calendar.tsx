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

import clsx from "clsx";
import styles from "./styles.module.css";

// Better in component or out?
const date = new Date();

export const SingleCalendar = ({
	month,
	year,
	data,
}: CalendarWithDataProps) => {
	const currentCalendar =
		date.getMonth() + 1 === month && date.getFullYear() === year;

	return (
		<div className={styles.wrapper}>
			<div
				className={clsx({
					[styles.calendar]: true,
					[styles.currentCalendar]: currentCalendar,
				})}
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
