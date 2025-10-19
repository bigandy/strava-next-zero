"use client";

import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export function SignOut() {
	const handleClick = async () => {
		await signOut();
		await redirect("/");
	};
	return (
		<button onClick={handleClick} type="submit">
			Sign Out
		</button>
	);
}
