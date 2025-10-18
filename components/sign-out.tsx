import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
				await redirect("/");
			}}
		>
			<button type="submit">Sign Out</button>
		</form>
	);
}
