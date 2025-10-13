import { signIn } from "auth";

type Provider = "strava" | "github";

export function SignIn({ provider }: { provider: Provider }) {
	return (
		<form
			action={async () => {
				"use server";
				await signIn(provider);
			}}
		>
			<button type="submit">Signin with {provider}</button>
		</form>
	);
}
