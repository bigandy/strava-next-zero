import { headers } from "next/headers";
import Link from "next/link";
import { MainNav } from "@/components/MainNav";
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
					<Link href={`/users/${session.user.id}`}>
						{session.user?.image && (
							<img
								src={session.user?.image}
								height="124"
								width="124"
								className="rounded-sm my-4"
								alt="user avatar"
							/>
						)}
					</Link>

					<MainNav />
				</>
			) : (
				<SignInButton />
			)}
		</div>
	);
};
