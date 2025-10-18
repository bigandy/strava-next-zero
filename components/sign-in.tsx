import { signIn } from "auth";

type Provider = "strava";

export function SignIn({ provider }: { provider: Provider }) {
	return (
		<form
			action={async () => {
				"use server";
				await signIn(provider);
			}}
		>
			<button
				type="submit"
				className="border rounded-sm border-black p-4 mb-4 bg-[#F52] text-white"
			>
				Signin with {provider}
			</button>
		</form>
	);
}
