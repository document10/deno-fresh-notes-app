import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Error500Page({ error }: PageProps) {
  return (
    <div class="px-4 py-8 mx-auto bg-red-600">
      <Head>
        <title>An error has occured!</title>
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img src="/logo.svg" width={128} height={128}></img>
        <h1 class="text-4xl font-bold">500 - Internal server error</h1>
        <p class="my-4">
          Something went wrong and the request couldn't be fullfilled. More
          info:
          {(error as Error).message}
        </p>
        <a href="/" class="underline">Go back home</a>
      </div>
    </div>
  );
}
