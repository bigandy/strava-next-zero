import { flexRender, type Table } from "@tanstack/react-table";
import type { TData } from "./utils";

export const TableHead = ({ table }: { table: Table<TData> }) => {
	return (
		<thead>
			{table.getHeaderGroups().map((hg) => (
				<tr key={hg.id}>
					{hg.headers.map((header) => (
						<th key={header.id} colSpan={header.colSpan}>
							{flexRender(header.column.columnDef.header, header.getContext())}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
};
