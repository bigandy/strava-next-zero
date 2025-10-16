import { CellWithDots } from "./cell";
import { getMonthDays } from "./utils";

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
							if (!cell) {
								return <td key={`cell-${cellIndex}`} />;
							}

							const todayDots = data?.filter((dot) => {
								return dot.date === cell.date;
							});

							return (
								<CellWithDots
									key={`cell-${cellIndex}`}
									number={cell.number}
									// activeDay={cell.activeDay}
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
