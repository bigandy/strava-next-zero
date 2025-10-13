"use client";

import { useEffect, useState } from "react";

export function ClientOnly({
	children,
	fallback,
}: Readonly<{
	children: React.ReactNode;
	fallback?: React.ReactNode;
}>) {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => setIsClient(true), []);

	if (!isClient) {
		return <>{fallback}</>;
	}
	return <>{children}</>;
}
