import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import type { Activity } from "@/schema";
import { CellWithDots } from "./cell";
import { formattedGetDMY, getDate, getMonthDays } from "./utils";

dayjs.extend(isToday);

interface Props {
	month: number;
	year: number;
	data?: Array<Activity>;
}

export const Rows = ({ month, year, data }: Props) => {
	const rows = getMonthDays(month, year);

	return (
		<>
			{rows.map((row, rowIndex) => {
				return (
					<tr key={`row-${rowIndex}`}>
						{row.map((cell, cellIndex) => {
							const day = cell?.number ?? 0;

							const dateString = getDate({ day, month, year });

							if (!cell) {
								return <td key={`cell-${month}-${year}-${cellIndex}`} />;
							}

							const todayDots = data?.filter((dot) => {
								return formattedGetDMY(dot.start) === cell.date;
							});

							const isToday = dateString.isToday();

							return (
								<CellWithDots
									key={`cell-${dateString}`}
									number={cell.number}
									activeDay={isToday}
									dots={todayDots || []}
									index={cellIndex + 1}
								/>
							);
						})}
					</tr>
				);
			})}
		</>
	);
};
