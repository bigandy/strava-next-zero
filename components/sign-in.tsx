"use client";

import { signIn } from "@/lib/auth-client";

type Provider = "strava" | "github";

export function SignIn({ provider }: { provider: Provider }) {
	const handleClick = async () => {
		if (provider === "strava") {
			const { data, error } = await signIn.oauth2({
				providerId: "strava", // required
				// callbackURL: "/dashboard",
				// errorCallbackURL: "/error-page",
				// newUserCallbackURL: "/welcome",
				// disableRedirect: false,
				// scopes: ["my-scope"],
				requestSignUp: false,
			});
			console.log({ data, error });
		} else {
			await signIn.social({
				/**
				 * The social provider ID
				 * @example "github", "google", "apple"
				 */
				provider: "github",
				// /**
				//  * A URL to redirect after the user authenticates with the provider
				//  * @default "/"
				//  */
				// callbackURL: "/dashboard",
				// /**
				//  * A URL to redirect if an error occurs during the sign in process
				//  */
				// errorCallbackURL: "/error",
				// /**
				//  * A URL to redirect if the user is newly registered
				//  */
				// newUserCallbackURL: "/welcome",
				// /**
				//  * disable the automatic redirect to the provider.
				//  * @default false
				//  */
				// disableRedirect: true,
			});
		}
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
