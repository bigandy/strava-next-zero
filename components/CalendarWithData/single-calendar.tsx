import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";
import { Header } from "./calendar-header";
import { Rows } from "./row";
import { TableHeader } from "./table-header";
import { getDate } from "./utils";

interface CalendarWithDataProps {
	month: number;
	year: number;
}

import clsx from "clsx";
import dayjs from "dayjs";
import styles from "./styles.module.css";

// Better in component or out?

export const SingleCalendar = ({ month, year }: CalendarWithDataProps) => {
	const calendarDate = getDate({ day: 1, month, year });
	const today = dayjs();

	const currentCalendar =
		+today.month() + 1 === +month && +today.year() === +year;

	const z = useZero();

	const startOfMonth = calendarDate;
	const endOfMonth = calendarDate.endOf("month");

	const [activities] = useQuery(
		z.query.activities
			.where("start", ">=", startOfMonth.valueOf())
			.where("start", "<=", endOfMonth.valueOf())
			.orderBy("start", "desc"),
	);

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
						<Rows month={month} year={year} data={activities} />
					</tbody>
				</table>
			</div>
		</div>
	);
};
