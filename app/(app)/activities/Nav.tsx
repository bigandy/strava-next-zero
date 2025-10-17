"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
	const pathname = usePathname();

	return (
		<>
			<Link
				className={clsx("underline text-blue-500 mr-4", {
					"text-orange-500": pathname === "/activities",
				})}
				href="/activities"
			>
				Table
			</Link>

			<Link
				className={clsx("underline text-blue-500 mr-4", {
					"text-orange-500": pathname === "/activities/calendar",
				})}
				href="/activities/calendar"
			>
				Calendar
			</Link>
		</>
	);
};
