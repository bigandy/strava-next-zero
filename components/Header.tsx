
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

import { auth } from 'auth'

export const Header = async () => {
    const session = await auth();

    return (
        <div className="mb-4">
            {session ? (
                <>
                    <SignOut />
                    {session.user?.image && <img src={session.user?.image} height="50" width="50" className="rounded" />}

                    <details>
                        <summary>User Information</summary>

                        <pre className="whitespace-pre-wrap break-all px-4 py-6">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </details>

                </>
            ) : <>
                <SignIn provider="github" />
                <SignIn provider="strava" />
            </>
            }
        </div>
    )
}