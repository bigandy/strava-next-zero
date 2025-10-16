import { Dot } from "./Dot";
import styles from "./styles.module.css";
import { indexToDay } from "./utils";

interface CellProps {
	number: number;
	activeDay: boolean;
	index: number;
}

interface CellWithDotsProps extends CellProps {
	dots: any[];
}

export const CellWithDots = ({
	number,
	activeDay,
	dots,
	index,
}: CellWithDotsProps) => {
	return (
		<td
		// classList={{
		// 	[styles.calendarDay]: true,
		// 	[styles.calendarDayActive]: activeDay,
		// }}
		>
			<span className={`${styles.dayName} vh`}>{indexToDay(index)}</span>

			{dots && dots.length > 0 && (
				<div className={styles.dots}>
					{dots.map((dot, index) => {
						if (dot.information) {
							return (
								<DotWithPopover
									key={`dot-${dot.date}-${index}`}
									title={dot.information.title}
									content={dot.information.content}
									link={dot.information.link}
								/>
							);
						} else {
							// console.log({ dot });
							return <Dot key={`dot-${dot.date}-${index}`} />;
						}
					})}
				</div>
			)}

			<span
				className={styles.dayCount}
				// classList={{
				// 	[styles.dayCount]: true,
				// }}
			>
				{number}
			</span>
		</td>
	);
};

export const Cell = ({ number, activeDay, index }: CellProps) => {
	return (
		<td
		// classList={{
		// 	[styles.calendarDay]: true,
		// 	[styles.calendarDayActive]: activeDay,
		// }}
		>
			<span className={`${styles.dayName} vh`}>{indexToDay(index)}</span>

			<span
			// classList={{
			// 	[styles.dayCount]: true,
			// }}
			>
				{number}
			</span>
		</td>
	);
};
