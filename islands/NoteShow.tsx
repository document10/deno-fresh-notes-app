import { type Signal } from "@preact/signals";
import { Note } from "../types/Note.ts";
import { Head } from "$fresh/runtime.ts";

interface NoteShowProps {
  note: Signal<Note>;
}

export default function NoteShow(props: NoteShowProps) {
  const date = new Date(props.note.value.lastUpdated.toString())
    .toLocaleString();
  let newtitle = props.note.value.title;
  let newcontent = props.note.value.content;
  return (
    <form class="flex flex-col gap-3 md:gap-1 p-5 md:p-3 bg-yellow-400 rounded-3xl">
      <h1 class="text-3xl text-black">Edit note {props.note.value.id}</h1>
      <Head>
        <title>{`Edit note ${props.note.value.id}`}</title>
      </Head>
      <label class=" text-xl text-black">
        Note Title:
      </label>
      <input
        class="text-xl text-black p-3 rounded-2xl border-2 border-black"
        type="text"
        id="title"
        value={props.note.value.title}
        onChange={(event) => newtitle = event.target.value}
      />
      <label class=" text-xl text-black">
        Note Content:
      </label>
      <textarea
        class="text-xl text-gray-950 h-32 border-2 border-black rounded-2xl"
        type="text"
        id="content"
        onChange={(event) => newcontent = event.target.value}
      >
        {props.note.value.content}
      </textarea>
      <p class="text-xs text-gray-500">
        #{props.note.value.id};Updated at {date}
      </p>
      <div class="flex flex-row gap-3 items-center justify-center align-middle">
        <button
          class="text-lg text-gray-50 bg-green-500 rounded-xl p-2 transition-all duration-200 hover:bg-green-600 hover:text-gray-100 hover:scale-105"
          type="button"
          onClick={async () => {
            const newNote = {
              title: newtitle,
              content: newcontent,
            };
            await fetch(`/api/notes/${props.note.value.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newNote),
            });
            globalThis.location.href = "/";
          }}
        >
          Save changes
        </button>
        <button
          class="text-lg text-gray-50 bg-red-500 rounded-xl p-2 transition-all duration-200 hover:bg-red-600 hover:text-gray-100 hover:scale-105"
          type="submit"
          onClick={async () => {
            await fetch(`/api/notes/${props.note.value.id}`, {
              method: "DELETE",
            });
            globalThis.location.href = `/view/`;
          }}
        >
          Delete note
        </button>
      </div>
    </form>
  );
}
