import { ActiviesNav } from "./ActiviesNav";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<ActiviesNav />

			{children}
		</>
	);
}
