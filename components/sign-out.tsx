"use client";

import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "./button";

export function SignOut() {
	const handleClick = async () => {
		await signOut();
		await redirect("/");
	};
	return (
		<Button onClick={handleClick} type="submit">
			Sign Out
		</Button>
	);
}
