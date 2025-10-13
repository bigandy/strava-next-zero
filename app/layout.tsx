import { cookies } from "next/headers";
import Link from "next/link";
import * as jose from 'jose';
import { ZeroProvider } from "@/components/zero";
import { ClientOnly } from "@/components/client-only";

import "./globals.css";

const secret = new TextEncoder().encode(process.env.ZERO_AUTH_SECRET!);

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div>
        <h1>Not authenticated</h1>
        <Link href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  const { payload } = await jose.jwtVerify(token, secret);
  return (
    <div className="p-10">
      <div className="flex gap-2 mb-10">
        <Link href="/tasks">
          Tasks
        </Link>
        <Link href="/users">
          Users
        </Link>
        <Link href="/todos">
          Todos
        </Link>
      </div>
      <ClientOnly fallback={<div>Loading...</div>}>
        <ZeroProvider authToken={token} userID={payload.sub || "anon"}>
          {children}
        </ZeroProvider>
      </ClientOnly>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}