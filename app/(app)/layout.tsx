import { cookies } from "next/headers";
import Link from "next/link";
import * as jose from 'jose';
import { ZeroProvider } from "@/components/zero";
import { ClientOnly } from "@/components/client-only";

const secret = new TextEncoder().encode(process.env.ZERO_AUTH_SECRET!);

export default async function Layout({
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
    <>
      <div className="flex gap-2 mb-4">
        <Link href="/tasks">
          Tasks
        </Link>
        <Link href="/users">
          Users
        </Link>
      </div>
      <ClientOnly fallback={<div>Loading...</div>}>
        <ZeroProvider authToken={token} userID={payload.sub || "anon"}>
          {children}
        </ZeroProvider>
      </ClientOnly>
    </>
  );
}
