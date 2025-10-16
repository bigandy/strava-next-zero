import { useState } from "react";
import { SingleCalendar } from "./single-calendar";
import { TableHeader } from "./table-header";
// import styles from "./styles.module.css";
import { YearHeader } from "./year-header";

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

const currentYear = new Date().getFullYear();
const months = new Array(1).fill("");
export const MultipleCalendars = ({ data }: CalendarWithDataProps) => {
	const [year, setYear] = useState(currentYear);

	return (
		<div>
			<YearHeader year={year} setYear={setYear} currentYear={currentYear} />
			<div className="grid grid-cols-3 gap-4">
				{months.map((_, index) => {
					const month = index + 1;

					const dataForCalendar = data.filter(
						(d) => +d.month === +month && +year === +d.year,
					);

					return (
						<SingleCalendar
							month={month}
							year={year}
							data={dataForCalendar}
							key={`month-${index}-year-${year}`}
						/>
					);
				})}
			</div>
		</div>
	);
};
