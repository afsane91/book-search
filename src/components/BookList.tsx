"use client";

import { useSearchBooks } from "@/features/books/useSearchBooks";
import type { OLDoc } from "@/types";

export default function BookList({
  query,
  limit = 12,
}: {
  query: string;
  limit?: number;
}) {
  const {
    data: items = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useSearchBooks(query, limit);

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <div className="aspect-[2/3] w-full rounded-xl bg-slate-200" />
            <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-700 ring-1 ring-red-200">
        <p>
          Something went wrong while fetching books. Please try again later.🙏
        </p>
        {error?.message && (
          <p className="mt-1 text-sm opacity-80">{error.message}</p>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-center text-slate-500">
        No results found for “{query}”.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {items.map((b: OLDoc) => (
        <li
          key={b.key}
          className="
            group rounded-2xl bg-white p-3
            ring-1 ring-slate-200 shadow-sm
            hover:shadow-lg hover:-translate-y-0.5
            transition-all duration-200
          "
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-100">
            {b.coverUrl ? (
              <img
                src={b.coverUrl}
                alt={b.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400 text-sm">
                No Cover
              </div>
            )}
          </div>

          <h3 className="mt-3 line-clamp-2 text-[15px] font-semibold text-slate-900 group-hover:text-slate-800">
            {b.title}
          </h3>

          {b.author_name?.[0] && (
            <p className="mt-1 line-clamp-1 text-xs text-slate-600">
              {b.author_name[0]}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
