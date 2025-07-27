export default function TopControls() {
  return (
    <div>
      <button
        class="text-lg text-gray-950 bg-green-500 rounded-xl p-2 m-3 transition-all duration-200 hover:bg-green-600 hover:text-gray-900 hover:scale-110"
        type="button"
        onClick={async () => {
          const newNote = {
            title: "New note",
            content: "Click here to edit the note!",
          };
          await fetch("/api/notes/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
          });
          globalThis.location.href = "/";
        }}
      >
        New note
      </button>
      <a
        class="text-lg text-gray-50 bg-purple-500 rounded-xl p-2 m-3 scale-100 transition-all duration-200 hover:bg-purple-600 hover:text-gray-100 hover:scale-125"
        href="/api/save"
      >
        Download notes
      </a>
    </div>
  );
}
