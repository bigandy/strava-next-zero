import { auth } from "auth";
import { ClientOnly } from "@/components/client-only";
import { Header } from "@/components/Header";
import { ZeroProvider } from "@/components/zero";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<>
			<Header />

			<ClientOnly fallback={<div>Loading...</div>}>
				<ZeroProvider userID={session?.userId ?? "anon"} token={session.token}>
					{children}
				</ZeroProvider>
			</ClientOnly>
		</>
	);
}
