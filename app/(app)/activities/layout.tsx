import { Nav } from "./Nav";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<h1>Activities</h1>

			<Nav />

			{children}
		</>
	);
}
