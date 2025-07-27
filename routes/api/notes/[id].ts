import { FreshContext, Handlers } from "$fresh/server.ts";
import { PrismaClient } from "../../../prisma/generated/client.ts";
import { Note } from "../../../types/Note.ts";

export const handler: Handlers<Note> = {
  GET: async (_req: Request, ctx: FreshContext) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: Deno.env.get("DATABASE_URL"),
      });
      const note = await prisma.note.findUnique({
        where: { id: Number(ctx.params.id) },
      }) as Note;
      if (note) {
        return new Response(JSON.stringify(note), {
          "status": 200,
          "headers": { "Content-Type": "application/json" },
        });
      } else return new Response("Note was not found.", { status: 404 });
    } catch (err) {
      console.error(err);
      return new Response("Internal server error.", {
        status: 500,
      });
    }
  },
  DELETE: async (_req: Request, ctx: FreshContext) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: Deno.env.get("DATABASE_URL"),
      });
      const note = await prisma.note.delete({
        where: { id: Number(ctx.params.id) },
      }) as Note;
      return new Response(JSON.stringify(note), {
        "status": 200,
        "headers": { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      return new Response("Internal server error. The entry may not exist.", {
        status: 500,
      });
    }
  },
  PATCH: async (req: Request, ctx: FreshContext) => {
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
      const updatedNote = await prisma.note.update({
        where: { id: Number(ctx.params.id) },
        data: note,
      }) as Note;
      return new Response(JSON.stringify(updatedNote), {
        "status": 200,
        "headers": { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      return new Response("Internal server error. The entry may not exist.", {
        status: 500,
      });
    }
  },
};
