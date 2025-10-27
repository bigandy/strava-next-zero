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
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="border rounded p-1"
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					type="button"
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					type="button"
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					type="button"
					className="border rounded p-1"
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount().toLocaleString()}
					</strong>
				</span>
				<span className="flex items-center gap-1">
					| Go to page:
					<input
						type="number"
						min="1"
						max={table.getPageCount()}
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
