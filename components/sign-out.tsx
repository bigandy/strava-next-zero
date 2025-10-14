import { signOut } from "auth";
import { redirect } from "next/navigation";

export function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
				await redirect('/');
			}}
		>
			<button type="submit">Sign Out</button>
		</form>
	);
}
