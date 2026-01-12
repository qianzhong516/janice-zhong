"use client";

import Image from "next/image";
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const incrementVisits = async (url: string) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  });
  if (!response.ok) {
    throw new Error("Failed to update data");
  }
  return response.json();
};

const API_URL = "https://api.janice-zhong.com/visits";

export default function Home() {
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(API_URL, fetcher);

  useEffect(() => {
    incrementVisits(API_URL).then(() => {
      // revalidate cache and trigger a refetch
      mutate(API_URL);
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert mb-10"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Hi, I&apos;m Janice
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Total Views:{" "}
            {isLoading ? (
              <span>loading...</span>
            ) : error ? (
              <span>error</span>
            ) : (
              <span className="font-medium text-zinc-950 dark:text-zinc-50">
                {data.totalCount}
              </span>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
