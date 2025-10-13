'use client';

import { useMemo } from "react";
import type { ReactNode } from "react";
import { Zero } from "@rocicorp/zero";
import { ZeroProvider as ZeroProviderBase, useZero as _useZero } from "@rocicorp/zero/react";
import { schema, type Schema } from "@/schema";


export function ZeroProvider({ children, userID, authToken }: {
  children: ReactNode,
  authToken: string,
  userID: string,
}) {

  const z = useMemo(() => new Zero({
    userID,
    auth: () => authToken,
    server: process.env.NEXT_PUBLIC_ZERO_SERVER,
    schema,
    kvStore: "mem",
  }), [authToken, userID]);

  return (
    <ZeroProviderBase zero={z}>
      {children}
    </ZeroProviderBase>
  );
}

export const useZero = _useZero<Schema>;
