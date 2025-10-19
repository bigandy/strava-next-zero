"use client";

import { Zero } from "@rocicorp/zero";
import {
	useZero as _useZero,
	ZeroProvider as ZeroProviderBase,
} from "@rocicorp/zero/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useSession } from "@/lib/auth-client";
import { type Schema, schema } from "../schema";

export function ZeroProvider({
	children,
	userID,
	token,
}: {
	children: ReactNode;
	userID: string;
	token: string;
}) {
	const session = useSession();

	const z = useMemo(() => {
		const jwtStorageKey = `jwt-${session.data?.user.id}`;

		return new Zero({
			userID: session.data?.user.id ?? "null",
			// auth: token,
			auth: async (error) => {
				if (error === "invalid-token") {
					sessionStorage.removeItem(jwtStorageKey);
				}

				let token = sessionStorage.getItem(jwtStorageKey);
				if (!token) {
					if (!session.data?.user) return undefined;
					const response = await fetch("/api/auth/token");
					const data = await response.json();
					token = data.token;
					if (!token) throw new Error("No token found");
					sessionStorage.setItem(jwtStorageKey, token);
				}
				console.log("token", jwtStorageKey, token);
				return token ?? undefined;
			},
			server: process.env.NEXT_PUBLIC_ZERO_SERVER,
			schema,
			kvStore: "mem",
		});
	}, [userID, token]);

	return <ZeroProviderBase zero={z}>{children}</ZeroProviderBase>;
}

export const useZero = _useZero<Schema>;
