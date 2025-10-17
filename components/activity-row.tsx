import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import Link from "next/link";

const formatTime = (seconds: number) => {
	const d = dayjs.duration(seconds * 1000);

	const outSeconds = d.seconds() < 10 ? `0${d.seconds()}` : d.seconds();
	const outMinutes = d.minutes() < 10 ? `0${d.minutes()}` : d.minutes();
	const outHours = d.hours();

	if (outHours > 0) {
		return `${outHours}:${outMinutes}:${outSeconds}`;
	}
	return `${outMinutes}:${outSeconds}`;
};

export const ActivityRow = ({ activity }) => {
	return (
		<tr className="border border-black p-4">
			<td>
				<Link
					className="underline text-blue-400"
					href={`https://strava.com/activities/${activity.id}`}
					target="_blank"
				>
					{activity.name}
				</Link>
			</td>
			<td>{(activity.distance / 1000).toFixed(2)} km</td>
			<td>{activity.kudos}</td>
			<td>{dayjs(activity.start).format("DD / MM / YYYY [at] HH:mm")}</td>
			<td>{activity.elevation}m</td>
			<td>{formatTime(activity.elapsedTime)}</td>
			<td>{formatTime(activity.movingTime)}</td>
			<td>{activity.type}</td>
		</tr>
	);
};
