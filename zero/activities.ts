import { defineQuery } from "@rocicorp/zero";
import { z } from "zod";
import { zql } from "../schema";

export const activitiesQueries = {
    all: defineQuery(() => zql.activities),
    withStartCoords: defineQuery(() => zql.activities.where("startCoords", "IS NOT", null)),
    getWithId: defineQuery(
        z.object({
            id: z.string(),
        }),
        ({ args: { id } }) => {
            return zql.activities.where("id", id).one()
        }
    ),
    getByMonth: defineQuery(
        z.object({
            start: z.number(),
            end: z.number(),
        }),
        ({ args: { start, end } }) => {
            return zql.activities
                .where("start", ">=", start)
                .where("start", "<=", end)
                .orderBy("start", "desc");
        }
    )
};
