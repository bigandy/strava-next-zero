import {
	flexRender,
	getCoreRowModel,
	type Table,
	useReactTable,
} from "@tanstack/react-table";
import { Fragment } from "react";
import type { Activity } from "@/schema";
import { TableHead } from "./table-head";
import type { TData } from "./utils";
import { singleRowColumns as columns } from "./utils";

// remove the final column which is edit

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

/**
 * URGENT! DO NOT DELETE THIS AND COMBINE WITH THE ABOVE. CAUSES THE PAGE TO BREAK!!!
 */
const TableBody = ({ table }: { table: Table<TData> }) => {
	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				// console.log(row)
				return (
					<Fragment key={row.id}>
						<tr>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
						<tr>
							<td colSpan={9}>
								<h2>DESCRIPTION!</h2>
								<p>{row.original.description}</p>
							</td>
						</tr>
					</Fragment>
				);
			})}
		</tbody>
	);
};
