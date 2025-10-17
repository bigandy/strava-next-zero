import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { CellWithDots } from "./cell";
import { formattedGetDMY, getDate, getMonthDays } from "./utils";

dayjs.extend(isToday);

interface Props {
	month: number;
	year: number;
	data?: Array<DotData>;
}

export const Rows = ({ month, year, data }: Props) => {
	const rows = getMonthDays(month, year);

	return (
		<>
			{rows.map((row, rowIndex) => {
				return (
					<tr key={`row-${rowIndex}`}>
						{row.map((cell, cellIndex) => {
							const day = cellIndex + 1;
							const dateString = getDate({ day, month, year });

							if (!cell) {
								return <td key={`cell-${dateString}`} />;
							}

							const todayDots = data?.filter((dot) => {
								return formattedGetDMY(dot.start) === cell.date;
							});

							const isToday = dateString.isToday();

							return (
								<CellWithDots
									key={`cell-${dateString}`}
									number={cell.number}
									activeDay={isToday}
									dots={todayDots || []}
									index={cellIndex + 1}
								/>
							);
						})}
					</tr>
				);
			})}
		</>
	);
	// {row.map((cell, cellIndex) => {
	//                             if (!cell) {
	//                                 return <td />;
	//                             }

	//                             const todayDots = props.data?.filter(
	//                                 (dot) => dot.date === cell.date,
	//                             );

	//                             return (
	//                                 <div>CELL</div>
	//                                 // <CellWithDots
	//                                 //     number={cell.number}
	//                                 //     activeDay={cell.activeDay}
	//                                 //     dots={todayDots || []}
	//                                 //     index={cellIndex() + 1}
	//                                 // />
	//                             );
	//                         })}

	// return (
	// 	<For each={rows()}>
	// 		{(row) => (
	// 			<tr>
	// 				<For each={row}>
	// 					{(cell, cellIndex) => {
	// 						if (!cell) {
	// 							return <td />;
	// 						}

	// 						const todayDots = props.data?.filter(
	// 							(dot) => dot.date === cell.date,
	// 						);

	// 						return (
	// 							<CellWithDots
	// 								number={cell.number}
	// 								activeDay={cell.activeDay}
	// 								dots={todayDots || []}
	// 								index={cellIndex() + 1}
	// 							/>
	// 						);
	// 					}}
	// 				</For>
	// 			</tr>
	// 		)}
	// 	</For>
	// );
};
