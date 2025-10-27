import { flexRender, type Table } from "@tanstack/react-table";
import type { TData } from "./utils";

export const SortableTableHead = ({ table }: { table: Table<TData> }) => {
	return (
		<thead>
			{table.getHeaderGroups().map((hg) => (
				<tr key={hg.id}>
					{hg.headers.map((header) => (
						<th key={header.id} colSpan={header.colSpan}>
							{header.isPlaceholder ? null : (
								<button
									type="button"
									className={
										header.column.getCanSort()
											? "cursor-pointer select-none"
											: ""
									}
									onClick={header.column.getToggleSortingHandler()}
									title={
										header.column.getCanSort()
											? header.column.getNextSortingOrder() === "asc"
												? "Sort ascending"
												: header.column.getNextSortingOrder() === "desc"
													? "Sort descending"
													: "Clear sort"
											: undefined
									}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{{
										asc: " 🔼",
										desc: " 🔽",
									}[header.column.getIsSorted() as string] ?? null}
								</button>
							)}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
};
