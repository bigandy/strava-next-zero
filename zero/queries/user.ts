import { defineQuery } from "@rocicorp/zero";
import { z } from "zod";
import { zql } from "@/schema";

export const userQueries = {
    all: defineQuery(() => zql.user.related('provider')),
    getById: defineQuery(
        z.object({
            id: z.string(),
        }),
        ({ args: { id } }) => {
            return zql.user.related("provider").where("id", "=", id).one()
        })
};