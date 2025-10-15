"use client";

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";

export const User = ({ id }: {id: string}) => {
    const z = useZero();

	const [user] = useQuery(
        z.query.users
        .related("provider")
        .where("id", "=", id)
        .one()
    );

    return (
        <div>
            <div>
                <div>ID: {user?.id}</div>
                <div>User Name:{user?.name}</div>
                <div>User Email:{user?.email}</div>
                <div>User Image: {user?.image && <img
							src={user.image}
							height="50"
							width="50"
							className="rounded inline"
							alt="user avatar"
						/>}</div>

                <h2>TODO</h2>
                <div>Provider: {user?.provider?.provider}</div>
            </div>
        </div>
    )

}