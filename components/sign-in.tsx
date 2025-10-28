"use client";

import { signIn } from "@/lib/auth-client";

export function SignInButton() {
	const handleClick = async () => {
		await signIn.oauth2({
			providerId: "strava",
			requestSignUp: false,
		});
	};

	return (
		<button
			type="submit"
			className="border rounded-sm border-black p-4 mb-4 bg-[#F52]  hover:bg-[#cc4200] text-white cursor-pointer"
			onClick={handleClick}
		>
			Signin with Strava
		</button>
	);
}
