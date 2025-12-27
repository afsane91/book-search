// page.tsx
"use client";
import { useSearchBooks } from "@/features/books/useSearchBooks";
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import BookList from "@/components/BookList";

export default function Page() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [booting, setBooting] = useState(true);
  const { isFetching } = useSearchBooks(query, 12);
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 400);
    return () => clearTimeout(t);
  }, []);

  if (booting) {
    return (
      <main className="min-h-screen bg-slate-50 grid place-items-center">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="h-3 w-3 rounded-full bg-slate-900 animate-bounce" />
          <span className="h-3 w-3 rounded-full bg-slate-700 animate-bounce [animation-delay:120ms]" />
          <span className="h-3 w-3 rounded-full bg-slate-500 animate-bounce [animation-delay:240ms]" />
          <p className="ml-2 text-sm">Loading…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Book Search
          </h1>
          <p className="mt-2 text-slate-600">Search books and view covers</p>
        </header>

        <section className="mx-auto max-w-2xl rounded-2xl bg-white p-4 md:p-5 shadow-sm ring-1 ring-slate-200">
          <SearchBar
            value={input}
            onChange={(v) => {
              setInput(v);
              if (v.trim() === "") {
                setQuery("");
              }
            }}
            onSubmit={(v) => {
              const t = v.trim();
              if (t) setQuery(t);
            }}
            loading={isFetching}
          />
        </section>
        <section className="mt-8">
          {!query ? (
            <p className="text-center text-slate-500">
              Type something and press Search.
            </p>
          ) : isFetching ? (
            <div className="grid place-items-center py-10 text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-900 animate-bounce" />
                <span className="h-3 w-3 rounded-full bg-slate-700 animate-bounce [animation-delay:120ms]" />
                <span className="h-3 w-3 rounded-full bg-slate-500 animate-bounce [animation-delay:240ms]" />
                <p className="ml-2 text-sm">Searching…</p>
              </div>
            </div>
          ) : (
            <BookList query={query} />
          )}
        </section>
      </div>
    </main>
  );
}
