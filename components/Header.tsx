import { headers } from "next/headers";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";

export const Header = async () => {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	return (
		<div className="mb-4">
			{session ? (
				<>
					<SignOut />
					{session.user?.image && (
						<img
							src={session.user?.image}
							height="50"
							width="50"
							className="rounded-sm"
							alt="user avatar"
						/>
					)}

					<details>
						<summary>User Information</summary>

						<pre className="whitespace-pre-wrap break-all px-4 py-6">
							{JSON.stringify(session, null, 2)}
						</pre>
					</details>
				</>
			) : (
				<SignInButton />
			)}

			<div className="flex gap-2 mb-10">
				<Link href="/users">Users</Link>
				<Link href="/activities">Activities</Link>
			</div>
		</div>
	);
};
