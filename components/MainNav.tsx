"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
	{
		href: "/users",
		title: "Users",
	},
	{
		href: "/activities",
		title: "Activities",
	},
	// {
	// 	href: "/map",
	// 	title: "Map",
	// },
];

export const MainNav = () => {
	const pathname = usePathname();

	return (
		<div className="flex gap-2">
			{pages.map((page) => {
				return (
					<Link
						key={page.href}
						className={clsx("underline text-blue-500 mr-4", {
							"text-orange-500": pathname.startsWith(page.href),
						})}
						href={page.href}
					>
						{page.title}
					</Link>
				);
			})}
		</div>
	);
};
