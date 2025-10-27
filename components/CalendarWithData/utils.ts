import dayjs, { type Dayjs } from "dayjs";

const dayToNumericDay = (firstDayofMonth: string) => {
	let firstDayNumeric = 0;

	const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

	daysOfWeek.forEach((dayofWeek, index) => {
		if (dayofWeek === firstDayofMonth) {
			firstDayNumeric = index + 1;
		}
	});

	return firstDayNumeric;
};

export const getDate = ({
	day,
	month,
	year,
}: {
	day: number;
	month: number;
	year: number;
}) => {
	return dayjs(`${year}-${month}-${day}`, "YYYY-M-D");
};

export const getMonth = (month: number, year: number) => {
	const dateString = `${year}-${month}-01`;

	return dayjs(dateString).format("MMMM");
};

export const getDMY = (date: Dayjs) => {
	return date.format("DD-MM-YYYY");
};

export const formattedGetDMY = (date: number) => {
	return dayjs(date).format("D-M-YYYY");
};

export const indexToDay = (index: number) => {
	switch (index) {
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
		case 7:
			return "Sunday";
		default:
			return "no day";
	}
};

export const getMonthDays = (month: number, year: number) => {
	const dateString = `${year}-${month}-01`;

	const day = dayjs(dateString);

	const daysInMonth = day.daysInMonth();
	const firstDayofMonth = dayToNumericDay(day.format("dd"));

	// const { month, daysInMonth, year, firstDayofMonth, todayDay } = derivedMonth;

	const items = Math.ceil((daysInMonth + firstDayofMonth) / 7);

	let count = 0;
	const dates = [...new Array(items)].map((_, rowIndex) => {
		const days = [...new Array(7).fill("x")].map((_, cellIndex) => {
			if (
				(rowIndex === 0 && cellIndex + 1 < firstDayofMonth) ||
				count > daysInMonth - 1
			) {
				return null;
			} else {
				count++;

				// AHTODO: fix this awful mess!
				const date = `${count}-${month}-${year}`;

				return {
					number: count,
					date,
					// activeDay: count === todayDay,
				};
			}
		});

		return days;
	});

	return dates;
};
