"use client";

import { Zero } from "@rocicorp/zero";
import {
	useZero as _useZero,
	ZeroProvider as ZeroProviderBase,
} from "@rocicorp/zero/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { type Schema, schema } from "../schema";

export function ZeroProvider({
	children,
	userID,
}: {
	children: ReactNode;
	userID: string;
}) {
	const z = useMemo(() => {
		// const jwtStorageKey = `jwt-${userID}`;

		const zero = new Zero({
			userID,
			// auth: async (error) => {
			// 	if (error === "invalid-token") {
			// 		sessionStorage.removeItem(jwtStorageKey);
			// 	}
			// 	let token = sessionStorage.getItem(jwtStorageKey);
			// 	if (!token) {
			// 		if (!userID) return undefined;
			// 		const response = await fetch("/api/auth/token");
			// 		const data = await response.json();
			// 		token = data.token;
			// 		if (!token) throw new Error("No token found");
			// 		sessionStorage.setItem(jwtStorageKey, token);
			// 	}
			// 	return token ?? undefined;
			// },
			server: process.env.NEXT_PUBLIC_ZERO_SERVER,
			schema,
			kvStore: "mem",
		});

		zero.query.activities.limit(1_000).preload({
			ttl: "1m",
		});

		return zero;
	}, [userID]);

	return <ZeroProviderBase zero={z}>{children}</ZeroProviderBase>;
}

export const useZero = _useZero<Schema>;
