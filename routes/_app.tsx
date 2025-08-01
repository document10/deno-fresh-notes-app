import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deno Fresh Notes App</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossorigin="true"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="true"
        />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
