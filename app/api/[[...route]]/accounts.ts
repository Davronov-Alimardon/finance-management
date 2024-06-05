import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

// POST
const validatorPOST = zValidator(
  "json",
  insertAccountSchema.pick({
    name: true,
  })
);

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized", status: 401 }, 401),
      });
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({ data });
  })
  .post("/", clerkMiddleware(), validatorPOST, async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("json");

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .insert(accounts)
      .values({
        id: createId(),
        userId: auth.userId,
        ...values,
      })
      .returning();

    return c.json({ data });
  });

export default app;
