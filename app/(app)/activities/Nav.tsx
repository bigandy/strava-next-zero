"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
	{
		href: "/activities",
		title: "Table",
	},
	{
		href: "/activities/calendar",
		title: "Calendar",
	},
	{
		href: "/activities/search",
		title: "Search",
	},
];

export const Nav = () => {
	const pathname = usePathname();

	return (
		<>
			{pages.map((page) => {
				return (
					<Link
						key={page.href}
						className={clsx("underline text-blue-500 mr-4", {
							"text-orange-500": pathname === page.href,
						})}
						href={page.href}
					>
						{page.title}
					</Link>
				);
			})}
		</>
	);
};
