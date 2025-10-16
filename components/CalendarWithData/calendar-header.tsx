import { Button } from "../button";

import styles from "./styles.module.css";

import { getMonth } from "./utils";

// interface Props {
// 	offset: number;
// 	setOffset: number;
// }

export const Header = ({ offset, setOffset }) => {
	const derivedGetMonthlyData = () => getMonth(offset);

	const monthsWrappedInSpans = () =>
		[...derivedGetMonthlyData().month].map((letter, index) => (
			<span key={`letter-${index}`}>{letter}</span>
		));

	return (
		<>
			<header>
				<h1 className={styles.calendarMonth}>{monthsWrappedInSpans()}</h1>
				<h2 className={styles.calendarYear}>{derivedGetMonthlyData().year}</h2>

				<Button handleClick={() => setOffset((o) => o - 12)}>
					&lt;&lt; <span className="vh">previous year</span>
				</Button>

				<Button handleClick={() => setOffset((o) => o + 12)}>
					&gt;&gt; <span className="vh">next year</span>
				</Button>

				<div>
					<Button
						// primary
						handleClick={() => setOffset((o) => o - 1)}
					>
						Prev
					</Button>

					<Button
						// secondary
						handleClick={() => setOffset(0)}
						disabled={offset === 0}
					>
						Now
					</Button>

					<Button
						// primary
						handleClick={() => setOffset((o) => o + 1)}
					>
						Next
					</Button>
				</div>
			</header>
		</>
	);
};
