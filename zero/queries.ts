import { defineQueries } from "@rocicorp/zero";
import { activitiesQueries } from "./queries/activities";
import { userQueries } from "./queries/user";

export const queries = defineQueries({
    activities: activitiesQueries,
    user: userQueries,
});
