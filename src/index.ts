import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { bearerAuth } from "hono/bearer-auth";
import { getAscendedMatch } from "./routes/ascended";
import { getEvolvedMatch } from "./routes/evolved";

const app = new Hono();
const token = Bun.env.TOKEN;

if (!token) throw new Error("Environmental token required.");

app.use(
  "/api/*",
  bearerAuth({ token }),
  rateLimiter({
    keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
    windowMs: 1 * 60 * 1000,
    limit: 50,
  }),
);

app.get("/api/ascended", async (c) => {
  const name = c.req.query("name")?.toLowerCase();
  if (!name) return c.json({ message: 'Missing "name" query parameter' }, 400);

  const data = await getAscendedMatch(name);
  return c.json(data);
});

app.get("/api/evolved", async (c) => {
  const name = c.req.query("name")?.toLowerCase();
  if (!name) return c.json({ message: 'Missing "name" query parameter' }, 400);

  const data = await getEvolvedMatch(name);
  return c.json(data);
});

export default app;
