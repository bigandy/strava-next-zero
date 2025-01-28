'use client';

import Link from "next/link";
import { ZeroProvider } from "@/components/zero";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!isClient) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Link href="/tasks">
          Tasks
        </Link>
        <Link href="/users">
          Users
        </Link>
      </div>
      <ZeroProvider>
        {children}
      </ZeroProvider>
    </>
  );
}
