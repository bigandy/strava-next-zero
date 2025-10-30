import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next Strava Viewer",
	description:
		"Next Strava Viewer with better-auth, drizzle, tailwind, zero-drizzle",
	// metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
					integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
					crossOrigin=""
				/>
			</head>
			<body>
				<div className="flex h-full min-h-screen w-full flex-col justify-between">
					<main className="mx-auto w-full max-w-10xl flex-auto px-4 py-4 sm:px-6 md:py-6">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
