import {
  createSchema,
  definePermissions,
  Row,
  table,
  string,
  relationships,
} from "@rocicorp/zero";

const user = table("user")
  .columns({
    id: string(),
    name: string(),
  })
  .primaryKey("id");

const task = table("task")
  .columns({
    id: string(),
    name: string(),
    status: string(),
    createdById: string(),
    assignedToId: string(),
  })
  .primaryKey("id");

const taskRelationships = relationships(task, ({ one }) => ({
  createdBy: one({
    sourceField: ["createdById"],
    destSchema: user,
    destField: ["id"],
  }),
  assignedTo: one({
    sourceField: ["assignedToId"],
    destSchema: user,
    destField: ["id"],
  }),
}));

export const schema = createSchema(1, {
  tables: [user, task],
  relationships: [taskRelationships],
});

export type Schema = typeof schema;
export type User = Row<typeof schema.tables.user>;
export type Task = Row<typeof schema.tables.task>;

export const permissions = definePermissions(schema, () => ({}));
