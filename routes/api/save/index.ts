import { FreshContext } from "$fresh/server.ts";
// import { Note } from "../../../types/Note.ts";
import { PrismaClient } from "../../../prisma/generated/client.ts";
import { stringify } from "@std/csv/stringify";
export const handler = {
  GET: async (_req: Request, _ctx: FreshContext) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: Deno.env.get("DATABASE_URL"),
      });
      const notes = await prisma.note.findMany();
      return new Response(
        stringify(notes, {
          columns: ["id", "title", "content", "lastUpdated"],
        }),
        {
          "headers": { "Content-Type": "application/csv", "content-disposition": "filename=notes.csv" },
        },
      );
    } catch (err) {
      console.error(err);
      return new Response("Internal server error.", {
        status: 500,
      });
    }
  },
};
