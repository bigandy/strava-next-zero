import styles from "./styles.module.css";

import { getMonth } from "./utils";

interface Props {
	year: number;
	month: number;
}

export const Header = ({ year, month }: Props) => {
	const monthText = getMonth(month, year);

	const monthsWrappedInSpans = () =>
		[...monthText].map((letter, index) => (
			<span key={`letter-${index}`}>{letter}</span>
		));

	return (
		<header>
			<h1 className={styles.calendarMonth}>{monthsWrappedInSpans()}</h1>
		</header>
	);
};
