import clsx from "clsx";
import { DotWithPopover } from "./dot-with-popover";
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
			className={clsx({
				[styles.calendarDay]: true,
				[styles.calendarDayActive]: activeDay,
			})}
		>
			<span className={`${styles.dayName} vh`}>{indexToDay(index)}</span>

			{dots && dots.length > 0 && (
				<div className={styles.dots}>
					{dots.map((dot) => {
						return (
							<DotWithPopover
								key={`dot-${dot.id}`}
								name={dot.name}
								id={dot.id}
							/>
						);
					})}
				</div>
			)}

			<span className={styles.dayCount}>{number}</span>
		</td>
	);
};

export const Cell = ({ number, activeDay, index }: CellProps) => {
	return (
		<td
			className={clsx({
				[styles.calendarDay]: true,
				[styles.calendarDayActive]: activeDay,
			})}
		>
			<span className={`${styles.dayName} vh`}>{indexToDay(index)}</span>

			<span
				className={clsx({
					[styles.dayCount]: true,
				})}
			>
				{number}
			</span>
		</td>
	);
};
