import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatTime = (seconds: number) => {
	const d = dayjs.duration(seconds * 1000);

	const outSeconds = d.seconds() < 10 ? `0${d.seconds()}` : d.seconds();
	const outMinutes = d.minutes() < 10 ? `0${d.minutes()}` : d.minutes();
	const outHours = d.hours();

	if (outHours > 0) {
		return `${outHours}:${outMinutes}:${outSeconds}`;
	}
	return `${outMinutes}:${outSeconds}`;
};
