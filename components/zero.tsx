"use client";

import { Zero } from "@rocicorp/zero";
import {
	useZero as _useZero,
	ZeroProvider as ZeroProviderBase,
} from "@rocicorp/zero/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { type Schema, schema } from "@/schema";

import { getNewToken } from '../app/actions'

export function ZeroProvider({
	children,
	userID,
}: {
	children: ReactNode;
	userID: string
}) {

	const z = useMemo(
		() => {
			return new Zero({
				userID,
				auth: async () => {
					// AHTODO: Is there a way of doing so don't need to do this???
					return await getNewToken(userID)
				},
				server: process.env.NEXT_PUBLIC_ZERO_SERVER,
				schema,
				kvStore: "mem",
			});
		},
		[userID]
	);

	return <ZeroProviderBase zero={z}>{children}</ZeroProviderBase>;
}

export const useZero = _useZero<Schema>;
