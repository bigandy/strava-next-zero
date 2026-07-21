// app/api/zero/query/route.ts

import { mustGetQuery } from "@rocicorp/zero";
import { handleQueryRequest } from "@rocicorp/zero/server";
import { schema } from "@/schema";
import { queries } from "@/zero/queries";

export async function POST(request: Request) {
    const result = await handleQueryRequest({
        handler: (name, args) => {
            const query = mustGetQuery(queries, name);
            return query.fn({ args });
        },
        schema,
        request,
        userID: null,
    });

    return Response.json(result);
}
