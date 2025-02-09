import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

import { config } from "./config";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (_: Request, res: Response) => {
  const shortenedUrls = await prisma.url.findMany();
  res.json(shortenedUrls);
});

app.post("/shorten", async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  const shortId = nanoid(8);
  await prisma.url.create({
    data: { shortId, originalUrl: url },
  });

  const shortUrl = `http://localhost:${config.PORT}/${shortId}`;
  res.json({ shortUrl });
});

app.get("/:shortId", async (req: Request, res: Response) => {
  const { shortId } = req.params;
  const url = await prisma.url.findUnique({ where: { shortId } });

  if (!url) {
    res.status(404).json({ error: "URL not found" });
    return;
  }

  res.redirect(url.originalUrl);
});

app.listen(config.PORT, async () => {
  try {
    await prisma.$connect();
  } catch (err: unknown) {
    console.error("Failed to connect to the database");
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running on http://localhost:${config.PORT}`);
});
