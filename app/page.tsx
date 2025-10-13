
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

import { auth } from 'auth'



export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <div>
      <pre className="whitespace-pre-wrap break-all px-4 py-6">
        {JSON.stringify(session, null, 2)}
      </pre>

      {session ? <SignOut /> : <SignIn />}
    </div>
  );
  // }

  // return (
  //   <div className="p-10">
  //     <div className="flex gap-2 mb-10">
  //       <Link href="/tasks">
  //         Tasks
  //       </Link>
  //       <Link href="/users">
  //         Users
  //       </Link>
  //       <Link href="/todos">
  //         Todos
  //       </Link>
  //     </div>

  //     <div>
  //       {children}
  //     </div>
  //     {/* <ClientOnly fallback={<div>Loading...</div>}>
  //       <ZeroProvider authToken={token} userID={"anon"}>
  //         {children}
  //       </ZeroProvider>
  //     </ClientOnly> */}
  //   </div>
  // );
}