import { auth } from "auth";
import Link from "next/link";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export const Header = async () => {
	const session = await auth();

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
							className="rounded"
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
					{/* <SignIn provider="github" /> */}
					<SignIn provider="strava" />
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
