"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body className={inter.className}>
        <main className="flex  h-screen  justify-center items-center ">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-1 text-centers">
              Something went wrong
            </h1>
            <p className="text-xl mb-4 text-centers">{error.message}</p>
            <p className="text-xl mb-4 text-centers">{error.stack}</p>
            <button className="py-2 px-4 bg-red-50 text-red-500 rounded-md">
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
