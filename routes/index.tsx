import AllNotes from "../islands/AllNotes.tsx";
import NewNote from "../islands/NewNote.tsx";
export default async function Home() {
  const allnotes = await AllNotes();
  return (
    <div class="px-4 py-8 mx-auto items-center justify-items-center place-content-center min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <div>
          <h1 class="text-center text-gray-50 text-5xl">Deno Fresh Notes</h1>
          <NewNote />
          {allnotes}
        </div>
      </div>
    </div>
  );
}
