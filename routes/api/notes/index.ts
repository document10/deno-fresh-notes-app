import { FreshContext } from "$fresh/server.ts";
import { Note } from "../../../types/Note.ts";
import { PrismaClient } from "../../../prisma/generated/client.ts";

export const handler = {
  GET: async (_req: Request, _ctx: FreshContext) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: Deno.env.get("DATABASE_URL"),
      });
      const notes = await prisma.note.findMany() as Note[];
      return new Response(JSON.stringify(notes), {
        "headers": { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      return new Response("Internal server error.", {
        status: 500,
      });
    }
  },
  POST: async (req: Request, _ctx: FreshContext) => {
    try {
      const body = await req.json() as Note;
      const prisma = new PrismaClient({
        datasourceUrl: Deno.env.get("DATABASE_URL"),
      });
      const note: Note = {
        id: body.id,
        title: body.title,
        content: body.content,
        lastUpdated: new Date(Date.now()),
      };
      const createdNote = await prisma.note.create({ data: note });
      return new Response(JSON.stringify(createdNote), { status: 201 });
    } catch (err) {
      console.error(err);
      return new Response("Internal server error.", {
        status: 500,
      });
    }
  },
};
