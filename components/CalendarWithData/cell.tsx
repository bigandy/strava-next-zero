import clsx from "clsx";
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
	if (dots.length > 0) {
		console.log({ dots });
	}

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
					{dots.map((dot, index) => {
						if (dot.information) {
							console.log("HAVE INFO");
							return (
								<DotWithPopover
									key={`dot-${dot.date}-${index}`}
									title={dot.information.title}
									content={dot.information.content}
									link={dot.information.link}
								/>
							);
						} else {
							console.log({ dot });
							return <Dot key={`dot-${dot.date}-${index}`} />;
						}
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
