import Link from "next/link";
import { Header } from "@/components/Header";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<div className="flex gap-2 mb-10">
				<Link href="/tasks">Tasks</Link>
				<Link href="/users">Users</Link>
				<Link href="/todos">Todos</Link>
			</div>

			{children}
		</div>
	);
}
