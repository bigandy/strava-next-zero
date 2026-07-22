import { defineMutator, defineMutators } from "@rocicorp/zero";
import z from "zod";
// import { zql } from "../schema";

export const mutatorValidators = {
    user: {
        update: z.object({ id: z.string(), name: z.string() }),
    },
    activity: {
        update: z.object({
            id: z.string(),
            name: z.string().optional(),
            description: z.string().optional(),
        })
    }
} as const;

export const mutators = defineMutators({
    user: {
        update: defineMutator(
            mutatorValidators.user.update,
            async ({ tx, args: { id, name } }) => {
                await tx.mutate.user.update({
                    id,
                    name
                })
            }
        )
    },
    activity: {
        update: defineMutator(
            mutatorValidators.activity.update,
            async ({ tx, args: { id, name, description } }) => {
                await tx.mutate.activities.update({
                    id,
                    name,
                    description
                })
            }
        )
    },
})
