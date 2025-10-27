"use client";
import { useQuery } from "@rocicorp/zero/react";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { SortableTableHead } from "@/components/sortable-table-head";
import { columns, type SortingState } from "@/components/utils";
import { useZero } from "@/components/zero";

export const ActivitiesTable = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const [sorting, setSorting] = useState<SortingState>([]); // can set initial sorting state here
	const z = useZero();
	const [activities] = useQuery(z.query.activities.orderBy("start", "desc"));

	const table = useReactTable({
		// @ts-expect-error
		data: activities,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),

		state: {
			sorting,
			pagination,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
	});

	return (
		<div className="activities-table">
			<table className="w-full" style={{ tableLayout: "fixed" }}>
				<SortableTableHead table={table} />
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
			</table>
		</div>
	);
};
