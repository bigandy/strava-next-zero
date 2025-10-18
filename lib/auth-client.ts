import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [genericOAuthClient()],
	// baseURL: "http://localhost:3000",
});

export const { signIn, signOut, useSession } = authClient;
