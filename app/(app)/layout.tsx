import { Header } from '@/components/Header'
import { ClientOnly } from '@/components/client-only';
import { ZeroProvider } from '@/components/zero';

import Link from 'next/link';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = '';
  return (
    <div className="p-10">
      <Header />
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
        <ZeroProvider authToken={token} userID={"anon"}>
          {children}
        </ZeroProvider>
      </ClientOnly>
    </div>
  );
}