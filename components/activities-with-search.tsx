"use client";

import { escapeLike } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { TableHead } from "./table-head";
import { columns } from "./utils";

export const ActivitiesWithSearch = () => {
	const router = useRouter();
	const z = useZero();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});

	const [search, setValue] = useDebounceValue("", 100);

	const [activities] = useQuery(
		z.query.activities
			.orderBy("start", "desc")
			.where(({ cmp }) => cmp("name", "ILIKE", `%${escapeLike(search)}%`)),
	);

	const table = useReactTable({
		// @ts-expect-error
		data: activities,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),

		state: {
			pagination,
		},
		onPaginationChange: setPagination,
	});

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleRowClick = (id: string) => {
		router.push(`/activities/${id}`);
	};

	return (
		<>
			<input
				className="border border-black p-4 w-full"
				type="text"
				defaultValue=""
				onChange={handleInput}
			/>
			{search !== "" && (
				<div>
					<strong>{activities.length}</strong> activities featuring{" "}
					<strong>{search}</strong>
				</div>
			)}

			<div className="activities-table">
				<table className="w-full" style={{ tableLayout: "fixed" }}>
					<TableHead table={table} />
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								onClick={() => handleRowClick(row.original.id)}
								className="cursor-pointer"
							>
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
		</>
	);
};
