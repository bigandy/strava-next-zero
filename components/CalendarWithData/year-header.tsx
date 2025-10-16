import { Button } from "../button";

import styles from "./styles.module.css";

// interface Props {
// 	offset: number;
// 	setOffset: number;
// }

export const YearHeader = ({ year, setYear, currentYear }) => {
	return (
		<header className="flex border border-black p-2 flex-column gap-4">
			<h2 className={styles.calendarYear}>{year}</h2>
			<div className="flex p-2 flex-row gap-4">
				<Button handleClick={() => setYear((y) => y - 1)}>
					&lt;&lt; <span className="vh">previous year</span>
				</Button>

				<Button
					// secondary
					handleClick={() => setYear(currentYear)}
					disabled={year === currentYear}
				>
					Now
				</Button>

				<Button handleClick={() => setYear((o) => o + 1)}>
					&gt;&gt; <span className="vh">next year</span>
				</Button>
			</div>
		</header>
	);
};
