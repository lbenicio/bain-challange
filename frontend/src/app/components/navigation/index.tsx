"use client";

import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  return (
    <nav className="flex flex-col items-center justify-between w-4/5 my-10">
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => router.push("/calculate")}
      >
        Calculate distances
      </button>
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
        onClick={() => router.push("/distances")}
      >
        Distances
      </button>
    </nav>
  );
}
