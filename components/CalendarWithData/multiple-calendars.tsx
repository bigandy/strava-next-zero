"use client";
import { useState } from "react";
import { SingleCalendar } from "./single-calendar";
import { YearHeader } from "./year-header";

const currentYear = new Date().getFullYear();
const months = new Array(12).fill("");

export const MultipleCalendars = () => {
	const [year, setYear] = useState(currentYear);

	return (
		<div>
			<YearHeader year={year} setYear={setYear} currentYear={currentYear} />

			<div className="grid grid-cols-3 gap-4 mt-4">
				{months.map((_, index) => {
					const month = index + 1;

					return (
						<SingleCalendar
							month={month}
							year={year}
							key={`month-${index}-year-${year}`}
						/>
					);
				})}
			</div>
		</div>
	);
};
