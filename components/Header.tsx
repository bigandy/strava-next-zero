import { headers } from "next/headers";
import Link from "next/link";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";

export const Header = async () => {
	// const session = await auth();

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
				<>
					<SignIn provider="strava" />
					<SignIn provider="github" />
				</>
			)}

			<div className="flex gap-2 mb-10">
				<Link href="/tasks">Tasks</Link>
				<Link href="/users">Users</Link>
				<Link href="/todos">Todos</Link>
				<Link href="/activities">Activities</Link>
			</div>
		</div>
	);
};
