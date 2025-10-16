import { auth } from "auth";
import { redirect } from "next/navigation";
import { ClientOnly } from "@/components/client-only";
import { Header } from "@/components/Header";
import { ZeroProvider } from "@/components/zero";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<Header />

			<ClientOnly fallback={<div>Loading...</div>}>
				<ZeroProvider userID={session?.user.id ?? "anon"} token={session.token}>
					{children}
				</ZeroProvider>
			</ClientOnly>
		</>
	);
}
