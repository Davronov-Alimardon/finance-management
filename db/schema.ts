import { createId } from "@paralleldrive/cuid2"
import { createInsertSchema } from "drizzle-zod"
import { pgTable, text } from "drizzle-orm/pg-core"

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts)