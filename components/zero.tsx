"use client";

import { Zero } from "@rocicorp/zero";
import {
	useZero as _useZero,
	ZeroProvider as ZeroProviderBase,
} from "@rocicorp/zero/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { type Schema, schema } from "@/schema";



export function ZeroProvider({
	children,
	userID,
	token
}: {
	children: ReactNode;
	userID: string
	token: string
}) {
	const z = useMemo(
		() => {
			return new Zero({
				userID,
				auth: token,
				server: process.env.NEXT_PUBLIC_ZERO_SERVER,
				schema,
				kvStore: "mem",
			});
		},
		[userID, token]
	);

	return <ZeroProviderBase zero={z}>{children}</ZeroProviderBase>;
}

export const useZero = _useZero<Schema>;
