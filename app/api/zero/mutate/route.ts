// app/api/zero/mutate/route.ts

import { mustGetMutator } from "@rocicorp/zero";
import { handleMutateRequest } from "@rocicorp/zero/server";
import { zeroPostgresJS } from "@rocicorp/zero/server/adapters/postgresjs";
import postgres from "postgres";
import { schema } from "@/schema";
import { mutators } from "@/zero/mutators";

const pgURL = process.env.ZERO_UPSTREAM_DB;
const dbProvider = zeroPostgresJS(schema, postgres(pgURL));

export async function POST(request: Request) {
    const result = await handleMutateRequest({
        dbProvider,
        handler: (transact) =>
            transact((tx, name, args) => {
                const mutator = mustGetMutator(mutators, name);
                return mutator.fn({ args, tx });
            }),
        request,
        userID: null,
    });

    return Response.json(result);
}
