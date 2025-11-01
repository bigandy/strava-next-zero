import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ClientOnly } from "@/components/client-only";
import { Header } from "@/components/Header";
import { ZeroProvider } from "@/components/zero";
import { auth } from "@/lib/auth";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<Header />

			<ClientOnly fallback={<div>Loading...</div>}>
				<ZeroProvider userID={session.userId}>{children}</ZeroProvider>
			</ClientOnly>
		</>
	);
}
