import type { Dispatch, SetStateAction } from "react";
import { Button } from "../button";

interface Props {
	year: number;
	setYear: Dispatch<SetStateAction<number>>;
	currentYear: number;
}

export const YearHeader = ({ year, setYear, currentYear }: Props) => {
	return (
		<div className=" border border-black p-2 flex flex-col justify-center text-center">
			<h2 className={`styles.calendarYear font-bold text-4xl`}>{year}</h2>
			<header className="flex flex-column gap-4 justify-center">
				<div className="flex p-2 flex-row gap-4">
					<Button onClick={() => setYear((y) => y - 1)}>
						&lt;&lt; <span className="vh">previous year</span>
					</Button>

					<Button
						// secondary
						onClick={() => setYear(currentYear)}
						disabled={year === currentYear}
					>
						Now
					</Button>

					<Button onClick={() => setYear((y) => y + 1)}>
						&gt;&gt; <span className="vh">next year</span>
					</Button>
				</div>
			</header>
		</div>
	);
};
