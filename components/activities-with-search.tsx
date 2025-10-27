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
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { PaginationButtons } from "./pagination-buttons";
import { TableHead } from "./table-head";
import { columns } from "./utils";

export const ActivitiesWithSearch = () => {
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

	return (
		<>
			<div className="my-10">
				<input
					className="border border-black p-4 w-full"
					type="text"
					defaultValue=""
					onChange={handleInput}
				/>
			</div>
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
				<PaginationButtons table={table} />
			</div>
		</>
	);
};
