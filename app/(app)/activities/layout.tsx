import { Nav } from "./Nav";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav />

			{children}
		</>
	);
}
