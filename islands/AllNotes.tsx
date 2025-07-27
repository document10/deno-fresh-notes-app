import { Note } from "../types/Note.ts";

export default async function AllNotes() {
  const res = await fetch("http://localhost:8000/api/notes");
  const notes: Note[] = await res.json() as Note[];
  return (
    <div class="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-8 bg-green-950 rounded-2xl p-3 md:p-5">
      {notes.map((note) => (
        <a
          href={`/view/${note.id}`}
          class="bg-green-800 rounded-xl cursor-pointer p-3 transition-all duration-300 hover:bg-green-900 hover:scale-110"
        >
          <h1 class="text-5xl text-gray-50 pb-2">
            {note.title}
          </h1>
          <pre class="text-xl text-gray-100 flex flex-col text-wrap">{note.content}</pre>
          <p class="text-xs text-green-500">
            #{note.id};Updated at{" "}
            {new Date(note.lastUpdated.toString()).toLocaleString()}
          </p>
        </a>
      ))}
    </div>
  );
}
