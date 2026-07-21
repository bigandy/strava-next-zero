import { defineQueries } from "@rocicorp/zero";

import { activitiesQueries } from "./activities";
import { allQueries } from "./all";
import { userQueries } from "./user";

export const queries = defineQueries({
    all: allQueries,
    activities: activitiesQueries,
    user: userQueries,
});