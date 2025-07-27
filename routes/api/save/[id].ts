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
        // return new Response(JSON.stringify(note), {
        //   "status": 200,
        //   "headers": { "Content-Type": "application/json" },
        // });
        return new Response(`# ${note.title}\n\n${note.content}\n\n*${note.id};last updated ${note.lastUpdated}*`, {
          "status": 200,
          "headers": { "Content-Type": "application/markdown", "content-disposition": `filename=note_${note.id}.md` },
        });
      } else return new Response("Note was not found.", { status: 404 });
    } catch (err) {
      console.error(err);
      return new Response("Internal server error.", {
        status: 500,
      });
    }
  },
};
