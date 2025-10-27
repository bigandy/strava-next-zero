import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { Activity } from "@/schema";
import { TableHead } from "./table-head";
import { columns as allColumns } from "./utils";

// remove the final column which is edit
const columns = allColumns.toSpliced(allColumns.length - 1);

export const SingleActivityTable = ({ activity }: { activity: Activity }) => {
	const table = useReactTable({
		// @ts-expect-error
		data: [activity],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table className="w-full" style={{ tableLayout: "fixed" }}>
			<TableHead table={table} />
			<TableBody table={table} />
		</table>
	);
};

import { flexRender, type Table } from "@tanstack/react-table";
import type { TData } from "./utils";

export const TableBody = ({ table }: { table: Table<TData> }) => {
	return (
		<tbody>
			{table.getRowModel().rows.map((row) => (
				<tr key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<td key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};
