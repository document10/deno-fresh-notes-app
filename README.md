# Deno Fresh Notes App

This is a notes app created using [Deno](https://deno.com/) and [Fresh](https://fresh.deno.dev/). The app implements various concepts of web apps:

- Frontend created using [Fresh](https://fresh.deno.dev/), for lightning-fast load times
- Backend REST API using [Prisma](https://www.prisma.io/) for basic CRUD operations on a database and file downloads
- Modern and responsive design using [TailwindCSS](https://tailwindcss.com/)
- All written in [Typescript](https://www.typescriptlang.org/) for seamless development

## Screenshots

![Main Interface](/screenshots/main_ui.png)
![Edit note](/screenshots/edit_ui.png)

## Installation

1. Install dependencies

[Make sure you have Deno installed and at its latest version.](https://docs.deno.com/runtime/getting_started/installation/)

```sh
git clone https://github.com/document10/deno-fresh-notes-app
cd deno-fresh-notes-app
deno install --allow-scripts
```

2. Configure database

Update `prisma/schema.prisma` and `example.env` according to your database and rename `example.env` to `.env`.

Migrate the database and generate the client:

```sh
deno run db-setup
```

You can also use this command to manually generate the client if the previous command failed to generate it or you changed your settings:

```sh
deno run db-client
```

3. Launch the server

```sh
deno run start
```

4. (*Optional*) Set up optimized build

```sh
deno task build
deno run compile
./build/deno-fresh-notes-app
```

## Notes

- The app was built in two days, so there is room for improvement.
- There were cases where I had to use workarounds for Fresh's limitations.
- Nonetheless, I still beleive this is a good demo for those looking into using Deno and Fresh for serious projects.
