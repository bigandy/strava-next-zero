import type { Cell } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import type { Activity } from "@/schema";
import { formatTime } from "@/utils/time";

type TValue = string | number;

export type TData = Array<Activity>;
type CellProps = { cell: Cell<TData, TValue> };

type ColumnSort = {
	id: string;
	desc: boolean;
};
export type SortingState = ColumnSort[];

export const columns = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "distance",
		header: "Distance",
		cell: ({ cell }: CellProps) => `${(+cell.getValue() / 1000).toFixed(2)}km`,
	},
	{
		accessorKey: "kudos",
		header: "Kudos",
	},
	{
		accessorKey: "start",
		header: "Start",
		cell: ({ cell }: CellProps) =>
			dayjs(cell.getValue()).format("DD / MM / YYYY [at] HH:mm"),
	},
	{
		accessorKey: "elevation",
		header: "Elevation",
		cell: ({ cell }: CellProps) => `${cell.getValue()}m`,
	},
	{
		accessorKey: "elapsedTime",
		header: "Elapsed",
		cell: ({ cell }: CellProps) => formatTime(+cell.getValue()),
	},
	{
		accessorKey: "movingTime",
		header: "Moving",
		cell: ({ cell }: CellProps) => formatTime(+cell.getValue()),
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "id",
		header: "Edit",
		cell: ({ cell }: CellProps) => {
			return (
				<Link href={`/activities/${cell.getValue()}`}>Edit Activity?</Link>
			);
		},
	},
];
