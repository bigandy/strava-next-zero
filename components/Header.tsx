
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

import { auth } from 'auth'

export const Header = async () => {
    const session = await auth();

    return (
        <div>
            {session ? (
                <><SignOut />
                    {session.user?.image && <img src={session.user?.image} />}

                    <pre className="whitespace-pre-wrap break-all px-4 py-6">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </>
            ) : <>
                <SignIn provider="github" />
                <SignIn provider="strava" />
            </>
            }
        </div>
    )
}