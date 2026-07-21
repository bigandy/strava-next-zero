import { defineQuery } from "@rocicorp/zero";
import { zql } from "../schema";

export const allQueries = {
    all: defineQuery(() => zql.user)
};