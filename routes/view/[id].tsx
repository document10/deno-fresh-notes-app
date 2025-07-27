import { Handlers, PageProps } from "$fresh/server.ts";
import NoteShow from "../../islands/NoteShow.tsx";
import { useSignal } from "@preact/signals";
import { Note } from "../../types/Note.ts";
import Error404 from "../_404.tsx";
export const handler: Handlers<Note[]> = {
  GET: async (_req, ctx) => {
    const res = await fetch(`http://localhost:8000/api/notes/`);
    if (res.status == 404) return ctx.renderNotFound();
    const notes = await res.json() as Note[];
    return ctx.render(notes);
  },
};

export default function View(props: PageProps<Note[]>) {
  const id: number = Number(props.params.id);
  const note = props.data.find((val) => val.id == id) ||
    {
      id: -1,
      title: "Not found",
      content: "Note was not found",
      lastUpdated: new Date(Date.now()),
    } as Note;
  const noteSignal = useSignal(note);
  if (note.id != -1) {
    return (
      <div class="flex flex-col gap-3 md:p-3 items-center justify-items-center place-content-center min-h-screen">
        <NoteShow note={noteSignal} />
        <div class="flex flex-row gap-1 md:gap-3">
          <a
            class="text-lg text-center text-gray-50 bg-purple-500 rounded-xl p-2 transition-all duration-200 hover:bg-purple-600 hover:text-gray-100 hover:scale-105"
            href={`/api/save/${note.id}`}
          >
            Download note
          </a>
          <a
            class="text-lg text-center text-gray-50 bg-blue-500 rounded-xl p-2 transition-all duration-200 hover:bg-blue-600 hover:text-gray-100 hover:scale-105"
            href="/"
          >
            Return home
          </a>
        </div>
      </div>
    );
  } else return Error404();
}
