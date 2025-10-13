import { cookies } from "next/headers";
import Link from "next/link";
import * as jose from 'jose';
import { ZeroProvider } from "@/components/zero";
import { ClientOnly } from "@/components/client-only";
import { auth } from "auth"

import "./globals.css";

import { signIn, signOut } from "auth"

export function SignIn({
  provider,
  ...props
}: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  )
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-full min-h-screen w-full flex-col justify-between">
          <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}