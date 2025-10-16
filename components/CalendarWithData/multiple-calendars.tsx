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
const months = new Array(12).fill("");
export const MultipleCalendars = ({ data }: CalendarWithDataProps) => {
	const [year, setYear] = useState(currentYear);

	return (
		<div>
			<YearHeader year={year} setYear={setYear} currentYear={currentYear} />
			<div className="grid grid-cols-3 gap-4">
				{months.map((month, index) => {
					// const dataForCalendar = data.filter((d) => console.log(d));

					return (
						<SingleCalendar
							month={index + 1}
							year={year}
							data={data}
							key={`month-${index}-year-${year}`}
						/>
					);
				})}
			</div>
		</div>
	);
};
