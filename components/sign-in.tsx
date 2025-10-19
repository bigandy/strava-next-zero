"use client";

import { signIn } from "@/lib/auth-client";

type Provider = "strava";

export function SignIn({ provider }: { provider: Provider }) {
	const handleClick = async () => {
		const { data, error } = await signIn.oauth2({
			providerId: "strava",
			requestSignUp: false,
		});
		console.log({ data, error });
	};

	return (
		<button
			type="submit"
			className="border rounded-sm border-black p-4 mb-4 bg-[#F52] text-white"
			onClick={handleClick}
		>
			Signin with {provider}
		</button>
	);
}
