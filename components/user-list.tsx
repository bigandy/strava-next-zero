"use client";

import { useQuery } from "@rocicorp/zero/react";
import Link from "next/link";
import { queries } from "@/zero/queries";

export function UserList() {
	const [users] = useQuery(queries.user.all());
	// const [all] = useQuery(queries.all.all());

	console.log({ users });

	return (
		<div className="">
			{users.length > 0 ? (
				<ul className="list-disc list-inside">
					{users.map((u) => {
						console.log({ u })
						const name = `${u.name} - ${u?.provider?.providerId ?? "no provider provided"}`;

						return (
							<li key={u.id}>
								<Link href={`/users/${u.id}`} className="underline">
									{name}
								</Link>
							</li>
						);
					})}
				</ul>
			) : (
				<div>No Users Found</div>
			)}
		</div>
	);
}
